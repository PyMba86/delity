package app

import (
	"github.com/pymba86/delity/internal/core"
	"github.com/pymba86/delity/internal/graphql"
	"github.com/pymba86/delity/internal/graphql/resolver"
	"github.com/pymba86/delity/pkg/log"
	"github.com/pymba86/delity/pkg/router"
)

func GraphQLMuxHandleFunc(
	services *core.Services,
	logger log.Logger,
) func(r *router.Mux) {

	c := graphql.Config{
		Resolvers: &resolver.Resolver{
			Services: services,
			Log:      logger.WithPrefix("graphql"),
		}}

	schema := graphql.NewExecutableSchema(c)

	query := graphql.NewServer(schema, logger)

	return func(r *router.Mux) {

		r.Handle("/backend/graphql-playground",
			graphql.NewPlaygroundHandler("/backend/query"))

		r.Handle("/backend/query", query)

		// Websocket endpoint. This is only used in dev as in prod
		// the /ws prefix is handled by the proxy container and
		// removed after the appropriate http headers have been set.
		r.Handle("/ws/backend/query", query)
	}
}
