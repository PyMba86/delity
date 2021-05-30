package user

import (
	"context"
	"github.com/pkg/errors"
	"github.com/pymba86/delity/internal/models"
	"github.com/pymba86/delity/pkg/db"
)

// Store handles the direct database access for this entity.
type Store struct {
	db *db.Connection
}

// NewStore returns a new Store instance.
func NewStore(db *db.Connection) *Store {
	return &Store{db: db}
}

func (s Store) Create(ctx context.Context, user *models.User) (*models.User, error) {

	u := &models.User{}

	row := s.db.QueryRowContext(ctx,
		"INSERT INTO users(id, name) VALUES($1, $2) RETURNING id, name",
		user.ID, user.Name)

	err := row.Scan(&u.ID, &u.Name)

	return u, errors.WithStack(err)
}
