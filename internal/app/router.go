package app

import (
	"github.com/go-chi/chi/middleware"
	"github.com/go-chi/cors"
	"github.com/pymba86/delity/pkg/router"
	"io/ioutil"
	"net/http"
	"path/filepath"
)

func NewRouter(handlers ...func(r *router.Mux)) *router.Mux {

	mux := router.New()

	mux.UseMiddleware(middleware.RequestID)
	mux.UseMiddleware(middleware.RealIP)

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

func FrontendMuxHandleFunc(config *Config) func(r *router.Mux) {
	return func(r *router.Mux) {
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

func BackendMuxHandleFunc() func(r *router.Mux) {
	return func(r *router.Mux) {

	}
}
