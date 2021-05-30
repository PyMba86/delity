package app

import (
	"github.com/pymba86/delity/internal/graphql"
	"github.com/pymba86/delity/internal/registry"
	"github.com/pymba86/delity/pkg/log"
	"github.com/pymba86/delity/pkg/router"
)

func GraphQLMuxHandleFunc(
	services *registry.Services,
	logger log.Logger,
) func(r *router.Mux) {

	query := graphql.New(services, logger)

	return func(r *router.Mux) {

		r.Handle("/__graphql",
			graphql.NewPlaygroundHandler("/graphql"))

		r.Handle("/graphql", query)

		// Websocket endpoint. This is only used in dev as in prod
		// the /ws prefix is handled by the proxy container and
		// removed after the appropriate http headers have been set.
		r.Handle("/ws/graphql", query)
	}
}
