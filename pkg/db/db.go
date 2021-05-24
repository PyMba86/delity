package db

import (
	"context"
	"database/sql"
	"fmt"
	"github.com/jmoiron/sqlx"
	"github.com/pkg/errors"
	"github.com/pymba86/delity/pkg/log"
	"strings"
	"time"
)

type Connection struct {
	*sqlx.DB
	log log.Logger
}

type Rows struct {
	*sqlx.Rows
}

type Row struct {
	*sqlx.Row
}

type Tx struct {
	*sqlx.Tx
	Log log.Logger
}

type Result struct {
	sql.Result
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

func (c *Connection) Begin() (*Tx, error) {

	tx, err := c.DB.Beginx()

	defer logQueryWithArgs(c.log, time.Now(), "BEGIN TRANSACTION", nil)

	if err != nil {
		defer logErrorWithArgs(c.log, "BEGIN TRANSACTION", nil, err)
	}

	return &Tx{Tx: tx, Log: c.log}, err
}

func (tx *Tx) ExecContext(ctx context.Context, query string, args ...interface{}) (Result, error) {

	defer logQueryWithArgs(tx.Log, time.Now(), query, args)

	r, err := tx.ExecContext(ctx, query, args...)

	if err != nil {
		defer logErrorWithArgs(tx.Log, query, args, err)
	}

	return Result{r}, err
}

func (tx *Tx) Rollback() error {
	defer logQuery(tx.Log, time.Now(), "ROLLBACK")

	err := tx.Tx.Rollback()

	if err != nil {
		defer logErrorWithArgs(tx.Log, "ROLLBACK", nil, err)
	}

	return err
}

func (tx *Tx) Commit() error {
	defer logQuery(tx.Log, time.Now(), "COMMIT")
	err := tx.Tx.Commit()
	if err != nil {
		defer logErrorWithArgs(tx.Log, "ROLLBACK", nil, err)
	}
	return err
}

func RollbackError(tx *Tx, originalErr error) error {
	err := tx.Rollback()
	if err != nil {
		return errors.Wrap(err, "failed to rollback transaction")
	}
	return originalErr
}

// logErrorWithArgs times and logs a executed query with arguments
func logErrorWithArgs(logger log.Logger, query string, args []interface{}, err error) {

	query = strings.ReplaceAll(query, "?", "%v")

	query = fmt.Sprintf(query, args...)

	logger.WithFields(log.Fields{"error": err}).Errorf(query)
}

// logQueryWithArgs times and logs a executed query with arguments
func logQueryWithArgs(logger log.Logger, start time.Time, query string, args []interface{}) {

	query = strings.ReplaceAll(query, "?", "%v")

	query = fmt.Sprintf(query, args...)

	logQuery(logger, start, query)
}

// logQuery times and logs a executed query
func logQuery(logger log.Logger, start time.Time, query string) {

	duration := time.Since(start)

	timeField := log.Fields{"time": duration.String()}

	if duration > 100*time.Millisecond {
		// Log slow queries as warnings
		logger.WithFields(timeField).Warnln(query)
	} else if query == "ROLLBACK" {
		// Log rollback queries as warnings
		logger.WithFields(timeField).Warnln(query)
	} else {
		logger.WithFields(timeField).Traceln(query)
	}
}
