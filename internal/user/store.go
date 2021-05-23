package user

import "github.com/pymba86/delity/pkg/db"

// Store handles the direct database access for this entity.
type Store struct {
	db *db.Connection
}

// NewStore returns a new Store instance.
func NewStore(db *db.Connection) *Store {
	return &Store{
		db: db,
	}
}
