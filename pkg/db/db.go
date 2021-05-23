package db

import (
	"github.com/jmoiron/sqlx"
	"github.com/pymba86/delity/pkg/log"
	"time"
)

type Connection struct {
	*sqlx.DB
	log log.Logger
}

func New(driver string, source string, logger log.Logger) (*Connection, error) {

	logger.WithFields(log.Fields{"driver": driver, "source": source}).
		Traceln("creating db connection")

	db, err := sqlx.Connect(driver, source)

	if err != nil {
		return nil, err
	}

	return &Connection{DB: configure(db), log: logger}, err
}

func configure(db *sqlx.DB) *sqlx.DB {
	db.SetConnMaxLifetime(time.Second)
	return db
}
