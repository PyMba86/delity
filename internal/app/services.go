package app

import (
	"github.com/pymba86/delity/internal/user"
	"github.com/pymba86/delity/pkg/db"
)

type Services struct {
	User *user.Service
}

func NewServices(db *db.Connection) *Services {

	return &Services{
		User: user.NewService(user.NewStore(db)),
	}
}
