package cmd

import (
	"context"
	"github.com/pymba86/delity/internal/app"
	"github.com/pymba86/delity/pkg/log"
	"github.com/spf13/cobra"
	"net/http"
	"os"
	"os/signal"
	"syscall"
	"time"
)

var start time.Time

func init() {
	rootCmd.AddCommand(serveCmd)
	start = time.Now()
}

var serveCmd = &cobra.Command{
	Use:   "serve",
	Short: "Start the server",
	Long:  `This command boots the web server and serves the application to the local network.`,
	Run:   runServer,
}

func runServer(_ *cobra.Command, _ []string) {

	engine := boot()

	server := &http.Server{
		Addr:         engine.Config.Server.Url(),
		Handler:      engine,
		WriteTimeout: 15 * time.Second,
		ReadTimeout:  15 * time.Second,
	}

	logger := engine.Log.WithPrefix("cmd.serve")

	go engine.Listen(server)

	logger.WithFields(log.Fields{"startup.time": time.Since(start)}).Debugf("app started")

	graceful(engine, 30*time.Second, logger)
}

func graceful(instance *app.Engine, timeout time.Duration, logger log.Logger) {
	stop := make(chan os.Signal, 1)

	signal.Notify(stop, os.Interrupt, syscall.SIGTERM)

	<-stop

	ctx, cancel := context.WithTimeout(context.Background(), timeout)
	defer cancel()

	if err := instance.Shutdown(ctx); err != nil {
		logger.Errorf("application shutdown error: %v\n", err)
	} else {
		logger.Infoln("application stopped")
	}
}
