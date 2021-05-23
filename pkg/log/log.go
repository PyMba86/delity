package log

import (
	"github.com/sirupsen/logrus"
	"io"
	"io/ioutil"
	"os"
)

// Logger implementation is responsible for providing structured and level
type Logger interface {
	Debug(args ...interface{})
	Debugln(args ...interface{})
	Debugf(msg string, args ...interface{})
	Infof(msg string, args ...interface{})
	Info(msg string)
	Infoln(...interface{})
	Warn(msg string)
	Warnln(...interface{})
	Warnf(msg string, args ...interface{})
	Error(msg string)
	Errorf(msg string, args ...interface{})
	Fatalf(msg string, args ...interface{})
	Print(args ...interface{})
	Printf(msg string, args ...interface{})
	Println(...interface{})
	Trace(args ...interface{})
	Tracef(msg string, args ...interface{})
	Traceln(...interface{})
	Verbose() bool

	// WithFields should return a logger which is annotated with the given
	// fields. These fields should be added to every logging call on the
	// returned logger.
	WithFields(m map[string]interface{}) Logger
	WithPrefix(prefix string) Logger
}

type Fields logrus.Fields

func New(wr io.Writer, level string) Logger {

	if wr == nil {
		wr = os.Stderr
	}

	lr := logrus.New()
	lr.Out = wr

	lvl, err := logrus.ParseLevel(level)
	if err != nil {
		lvl = logrus.WarnLevel
		lr.Warnf("failed to parse log-level '%s', defaulting to 'warning'", level)
	}

	formatter := new(logrus.TextFormatter)
	formatter.TimestampFormat = "02-01-2006 15:04:05"
	formatter.FullTimestamp = true

	lr.SetLevel(lvl)
	lr.SetFormatter(formatter)

	return &logrusLogger{
		Entry: logrus.NewEntry(lr),
	}
}

func NewNullLogger() Logger {
	lr := logrus.New()
	lr.SetOutput(ioutil.Discard)
	return &logrusLogger{Entry: logrus.NewEntry(lr)}
}

func NewFromWriter(w io.Writer) Logger {
	lr := logrus.New()
	lr.SetOutput(w)
	lr.SetLevel(logrus.DebugLevel)
	return &logrusLogger{Entry: logrus.NewEntry(lr)}
}

// logrusLogger provides functions for structured logging.
type logrusLogger struct {
	*logrus.Entry
}

func (ll *logrusLogger) WithFields(fields map[string]interface{}) Logger {
	annotatedEntry := ll.Entry.WithFields(fields)
	return &logrusLogger{
		Entry: annotatedEntry,
	}
}

func (ll *logrusLogger) Error(msg string) {
	ll.Errorf(msg)
}

func (ll *logrusLogger) Info(msg string) {
	ll.Infof(msg)
}

func (ll *logrusLogger) Print(args ...interface{}) {
	ll.Debug(args...)
}

func (ll *logrusLogger) Warn(msg string) {
	ll.Warnf(msg)
}

func (ll *logrusLogger) Verbose() bool {
	return ll.Entry.Logger.GetLevel().String() == "debug"
}

func (ll *logrusLogger) WithPrefix(prefix string) Logger {
	return ll.WithFields(Fields{"prefix": prefix})
}
