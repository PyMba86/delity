package user

import (
	"context"
	"github.com/pymba86/delity/internal/models"
)

// Service encapsulates logic for user
type Service interface {
	Create(ctx context.Context, input *models.CreateUserInput) (*models.User, error)
}

// service is used to interact with the entity. It
// allows access to the store by embedding it.
type service struct {
	Store
}

// NewService returns a pointer to a new Service.
func NewService(store Store) Service {
	return &service{store}
}

func (s service) Create(ctx context.Context, input *models.CreateUserInput) (*models.User, error) {
	// TODO generate hash password
	return s.Store.Create(ctx,
		&models.User{
			Name: input.Name,
		},
	)
}
