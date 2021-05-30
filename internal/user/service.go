package user

import (
	"context"
	"github.com/pymba86/delity/internal/models"
)

// Service service is used to interact with the entity. It
// allows access to the store by embedding it.
type Service struct {
	*Store
}

// NewService returns a pointer to a new Service.
func NewService(store *Store) *Service {
	return &Service{Store: store}
}

func (s Service) Create(ctx context.Context, input *models.CreateUserInput) (*models.User, error) {
	// TODO generate hash password
	return s.Store.Create(ctx,
		&models.User{
			Name: input.Name,
		},
	)
}
