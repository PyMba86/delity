package user

import (
	"context"
	"github.com/pkg/errors"
	"github.com/pymba86/delity/internal/entity"
	"github.com/pymba86/delity/pkg/db"
)

type Store interface {
	// Create saves a new user in the storage.
	Create(ctx context.Context, user entity.User) (entity.User, error)
}

// Store handles the direct database access for this entity.
type store struct {
	db *db.Connection
}

// NewStore returns a new Store instance.
func NewStore(db *db.Connection) Store {
	return &store{db: db}
}

func (s store) Create(ctx context.Context, user entity.User) (entity.User, error) {

	tx, err := s.db.Begin()

	if err != nil {
		return user, errors.WithStack(err)
	}

	var u entity.User

	row := tx.QueryRowxContext(ctx,
		"INSERT INTO users (name) VALUES (&1) RETURNING name;", user.Name)

	if row.StructScan(&u) != nil {
		return user, db.RollbackError(tx, errors.WithStack(err))
	}

	return u, errors.WithStack(tx.Commit())
}
