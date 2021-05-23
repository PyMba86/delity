package app

import (
	"context"
	"github.com/go-chi/chi/middleware"
	"github.com/go-chi/cors"
	"github.com/pymba86/delity/internal/core"
	"github.com/pymba86/delity/pkg/log"
	"github.com/pymba86/delity/pkg/router"
	"io/ioutil"
	"net/http"
	"path/filepath"
	"runtime/debug"
	"time"
)

func NewRouter(logger log.Logger, handlers ...func(r *router.Mux)) *router.Mux {

	mux := router.New()

	mux.UseMiddleware(middleware.RequestID)
	mux.UseMiddleware(recoverMiddleware(logger))
	mux.UseMiddleware(middleware.RealIP)
	mux.UseMiddleware(versionHeaderMiddleware)

	corsMiddleware := cors.New(cors.Options{
		AllowedOrigins:   []string{"*"},
		AllowedMethods:   []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"},
		AllowedHeaders:   []string{"Accept", "Authorization", "Content-Type"},
		ExposedHeaders:   []string{"Link"},
		AllowCredentials: true,
		MaxAge:           300,
	})

	mux.UseMiddleware(corsMiddleware.Handler)

	for _, handler := range handlers {
		mux.Group(handler)
	}

	return mux
}

// recoverMiddleware recover from panic
func recoverMiddleware(logger log.Logger) func(http.Handler) http.Handler {
	return func(next http.Handler) http.Handler {
		fn := func(writer http.ResponseWriter, request *http.Request) {
			defer func() {

				if rvr := recover(); rvr != nil {
					logger.Errorf("Panic: %s", rvr)
					logger.Errorf("%+v", rvr)
					logger.Errorf("%+s", debug.Stack())

					http.Error(writer,
						http.StatusText(http.StatusInternalServerError),
						http.StatusInternalServerError)
				}
			}()
			next.ServeHTTP(writer, request)
		}
		return http.HandlerFunc(fn)
	}
}

// timeoutMiddleware cancels a request after a certain timeout was reached.
func timeoutMiddleware(timeout time.Duration) func(next http.Handler) http.Handler {
	return func(next http.Handler) http.Handler {

		fn := func(writer http.ResponseWriter, request *http.Request) {
			v := request.Header.Get("Upgrade")
			if v == "websocket" {
				next.ServeHTTP(writer, request)
			}

			ctx, cancel := context.WithTimeout(request.Context(), timeout)

			defer func() {
				cancel()
				if ctx.Err() == context.DeadlineExceeded {
					writer.WriteHeader(http.StatusGatewayTimeout)
				}
			}()

			request = request.WithContext(ctx)
			next.ServeHTTP(writer, request)
		}

		return http.HandlerFunc(fn)
	}
}

// versionHeaderMiddleware adds the current backend version as a HTTP response header
func versionHeaderMiddleware(next http.Handler) http.Handler {
	return http.HandlerFunc(func(writer http.ResponseWriter, request *http.Request) {
		writer.Header().Add("X-Webapp-Version", version)
		next.ServeHTTP(writer, request)
	})
}

// FrontendMuxHandleFunc contains all frontend routes
func FrontendMuxHandleFunc(config *Config) func(r *router.Mux) {
	return func(r *router.Mux) {
		r.UseMiddleware(timeoutMiddleware(30 * time.Second))

		r.HandleFunc("/*", func(writer http.ResponseWriter, request *http.Request) {

			indexPath := filepath.Join(config.Server.StaticDir, "index.html")

			contents, err := ioutil.ReadFile(indexPath)

			if err != nil {
				http.Error(writer, err.Error(), http.StatusInternalServerError)
				return
			}

			_, err = writer.Write(contents)

			if err != nil {
				http.Error(writer, err.Error(), http.StatusInternalServerError)
			}

		})
	}
}

// BackendMuxHandleFunc contains all backend routes
func BackendMuxHandleFunc(services *core.Services) func(r *router.Mux) {
	return func(r *router.Mux) {
		r.UseMiddleware(timeoutMiddleware(30 * time.Second))
	}
}
