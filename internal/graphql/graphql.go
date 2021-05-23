package graphql

import (
	"context"
	"github.com/99designs/gqlgen/graphql"
	"github.com/99designs/gqlgen/graphql/handler"
	"github.com/99designs/gqlgen/graphql/handler/extension"
	"github.com/99designs/gqlgen/graphql/handler/lru"
	"github.com/99designs/gqlgen/graphql/handler/transport"
	"github.com/99designs/gqlgen/graphql/playground"
	"github.com/gorilla/websocket"
	"github.com/pkg/errors"
	"github.com/pymba86/delity/pkg/log"
	"github.com/vektah/gqlparser/v2/gqlerror"
	"net/http"
	"runtime/debug"
	"time"
)

// NewPlaygroundHandler returns a new GraphQL Playground handler.
func NewPlaygroundHandler(endpoint string) http.Handler {
	return playground.Handler("GraphQL Playground", endpoint)
}

func NewServer(schema graphql.ExecutableSchema, logger log.Logger) *handler.Server {

	srv := handler.New(schema)

	srv.AddTransport(transport.Websocket{
		KeepAlivePingInterval: 15 * time.Second,
		Upgrader: websocket.Upgrader{
			CheckOrigin: func(r *http.Request) bool {
				return true
			},
		},
	})

	srv.AddTransport(transport.Options{})
	srv.AddTransport(transport.GET{})
	srv.AddTransport(transport.POST{})
	srv.AddTransport(transport.MultipartForm{})

	srv.SetQueryCache(lru.New(1000))

	srv.Use(extension.Introspection{})

	srv.Use(extension.AutomaticPersistedQuery{
		Cache: lru.New(100),
	})

	srv.SetRecoverFunc(func(ctx context.Context, err interface{}) (userMessage error) {
		logger.Errorf("%+v", err)
		logger.Errorf("%s", debug.Stack())
		if errString, ok := err.(string); ok {
			// You can report to Sentry here.
			_ = errString
			// sentry.CaptureException(errors.New(errString))
		}
		return errors.New("internal system error")
	})

	srv.SetErrorPresenter(func(ctx context.Context, err error) *gqlerror.Error {
		if gqlErr, isGQLError := err.(*gqlerror.Error); isGQLError {
			// Don't log validation errors.
			if _, isValidation := gqlErr.Extensions["validation"]; !isValidation {
				logger.Errorf("%+v", err)
			}
		}
		return graphql.DefaultErrorPresenter(ctx, err)
	})

	return srv
}
