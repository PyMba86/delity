package resolver

// This file will be automatically regenerated based on the schema, any resolver implementations
// will be copied through when generating and any unknown code will be moved to the end.

import (
	"context"
	"github.com/pymba86/delity/internal/user"

	"github.com/pymba86/delity/internal/entity"
	"github.com/pymba86/delity/internal/graphql/model"
	"github.com/pymba86/delity/internal/graphql/server"
)

func (r *mutationResolver) CreateUser(ctx context.Context, input model.UserInput) (*entity.User, error) {

	u, err := r.Services.User.Create(ctx, user.CreateUserParams{
		Name: "",
	})

	return &u, err
}

// Mutation returns server.MutationResolver implementation.
func (r *Resolver) Mutation() server.MutationResolver { return &mutationResolver{r} }

type mutationResolver struct{ *Resolver }
