package resolver

// This file will be automatically regenerated based on the schema, any resolver implementations
// will be copied through when generating and any unknown code will be moved to the end.

import (
	"context"
	"fmt"

	"github.com/pymba86/delity/internal/entity"
	"github.com/pymba86/delity/internal/graphql/server"
)

func (r *queryResolver) Users(ctx context.Context) ([]*entity.User, error) {
	panic(fmt.Errorf("not implemented"))
}

// Query returns server.QueryResolver implementation.
func (r *Resolver) Query() server.QueryResolver { return &queryResolver{r} }

type queryResolver struct{ *Resolver }
