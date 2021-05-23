//go:generate go run github.com/99designs/gqlgen

package resolver

import (
	"github.com/pymba86/delity/internal/core"
	"github.com/pymba86/delity/internal/graphql"
	"github.com/pymba86/delity/pkg/log"
)

type Resolver struct {
	Services *core.Services
	Log      log.Logger
}

func (r *Resolver) Query() graphql.QueryResolver {
	return &queryResolver{r}
}

type queryResolver struct{ *Resolver }
