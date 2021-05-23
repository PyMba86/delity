package app

import (
	"context"
	"fmt"
	"github.com/pymba86/delity/internal/core"
	"net/http"
	"os"
	"sync"
	"time"

	"github.com/pkg/errors"
	"github.com/pymba86/delity/pkg/db"
	"github.com/pymba86/delity/pkg/log"
	"github.com/pymba86/delity/pkg/router"

	_ "github.com/go-sql-driver/mysql"
)

// Possible application states
const (
	StateStopped int = iota
	StateStarting
	StateRunning
	StateStopping
)

// Version is set during build time
var version = "develop"

// Engine contains all shared application dependencies
type Engine struct {

	// Router is the applications http mux.
	Router *router.Mux

	// Log is the global application logger
	Log log.Logger

	// Config contains the application's configuration
	Config *Config

	// Database is the globally shared connection
	Db *db.Connection

	// State is the current state the application is in.
	state int

	// Services contains all the application's services
	services *core.Services

	// Server hold a pointer to the http server
	server *http.Server

	// Allows processes to register themselves for a graceful shutdown.
	wg *sync.WaitGroup

	// Context holds the application wide context.
	context cancelContext

	// ShutdownFunc are run at shutdown.
	shutdownFns []shutdownFunc
}

type shutdownFunc func() error

type cancelContext struct {
	cancel context.CancelFunc
	ctx    context.Context
}

func New() (*Engine, error) {

	config := NewConfig()

	logger := log.New(os.Stderr, config.Log.Level)

	database, err := db.New("mysql",
		config.Database.Dsn(), logger.WithPrefix("db"))

	if err != nil {
		return nil, errors.Wrap(err, "failed to connect to db")
	}

	// Create a global application context
	ctx, cancel := context.WithCancel(context.Background())

	// Create all dependencies services
	services := core.NewServices(database)

	// Create a router with all handlers
	mux := NewRouter(logger,
		FrontendMuxHandleFunc(config),
		BackendMuxHandleFunc(services),
		GraphQLMuxHandleFunc(services, logger))

	// Build the engine struct with all dependencies
	engine := &Engine{
		Config:   config,
		Router:   mux,
		Log:      logger,
		Db:       database,
		state:    StateRunning,
		wg:       &sync.WaitGroup{},
		context:  cancelContext{cancel: cancel, ctx: ctx},
		services: services,
	}

	return engine, nil
}

func (engine *Engine) ServeHTTP(w http.ResponseWriter, r *http.Request) {
	engine.Router.ServeHTTP(w, r)
}

func (engine *Engine) Listen(server *http.Server) {

	var err error

	engine.server = server

	logger := engine.Log.WithPrefix("http.server")

	logger.WithFields(log.Fields{"port": server.Addr}).Infof("starting http server")

	listen := func() error {
		if err = server.ListenAndServe(); err != http.ErrServerClosed {
			logger.Error(fmt.Sprintf("failed to start http server: %v", err))
			return err
		}
		return nil
	}

	for {
		// If the app is stopped or stopping, don't retry to start the server.
		if engine.state == StateStopping || engine.state == StateStopped {
			logger.Tracef(
				"skipping restarts of server because app is not in running state: %d",
				engine.state)
			return
		}

		if err = listen(); err != nil {
			time.Sleep(2 * time.Second)
			logger.Infof("re-staring http server after error on: %v", server.Addr)
			continue
		}
		return
	}
}

// Shutdown stops the application.
func (engine *Engine) Shutdown(ctx context.Context) error {
	if engine.state != StateRunning {
		engine.Log.WithPrefix("app").
			Warn("Application cannot be shutdown since current state is not 'running'")
		return nil
	}

	engine.state = StateStopping
	defer func() {
		engine.state = StateStopped
	}()

	if engine.server != nil {
		if err := engine.server.Shutdown(ctx); err != nil {
			engine.Log.Errorf("server shutdown error: %v\n", err)
		} else {
			engine.Log.Infoln("HTTP server stopped")
		}
	}

	// Cancel global context, then wait for all processes to quit.
	engine.context.cancel()

	done := make(chan struct{})

	go func() {
		engine.wg.Wait()
		close(done)
	}()

	// Run shutdown functions.
	for _, fn := range engine.shutdownFns {
		shutdownErr := fn()
		if shutdownErr != nil {
			engine.Log.Errorf("shutdown function returned error: %v\n", shutdownErr)
		}
	}

	select {
	case <-ctx.Done():
		return ctx.Err()
	case <-done:
	}

	return engine.Db.Close()
}

// registerShutdownFn registers a function to be run at shutdown
func (engine *Engine) registerShutdownFn(fn shutdownFunc) {
	engine.shutdownFns = append(engine.shutdownFns, fn)
}

// Version returns the app's version
func Version() string {
	return version
}
