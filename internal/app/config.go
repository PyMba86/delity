package app

import (
	"fmt"
	"github.com/spf13/viper"
	"strings"
)

type Config struct {
	Server   serverConfig
	Log      logConfig
	Database databaseConfig
}

type serverConfig struct {
	Host       string
	Port       string
	RootDir    string
	StaticDir  string
	StorageDir string
}

type logConfig struct {
	Level string
}

type databaseConfig struct {
	Host     string
	Name     string
	Port     string
	Username string
	Password string
	Path     string
}

func NewConfig() *Config {

	setDefaults()
	loadConfig()

	return &Config{
		Server: serverConfig{
			Host:      viper.GetString("server.host"),
			Port:      viper.GetString("server.port"),
			RootDir:   viper.GetString("server.root_dir"),
			StaticDir: viper.GetString("server.static_dir"),
		},
		Database: databaseConfig{
			Host:     viper.GetString("database.host"),
			Name:     viper.GetString("database.name"),
			Port:     viper.GetString("database.port"),
			Username: viper.GetString("database.username"),
			Password: viper.GetString("database.password"),
		},
		Log: logConfig{
			Level: viper.GetString("log.level"),
		},
	}
}

func setDefaults() {

	viper.SetDefault("server.host", "127.0.0.1")
	viper.SetDefault("server.port", "3333")
	viper.SetDefault("server.static_dir", "/app/static")
	viper.SetDefault("server.root_dir", "/app")

	viper.SetDefault("database.host", "db")
	viper.SetDefault("database.name", "delity")
	viper.SetDefault("database.port", "3306")
	viper.SetDefault("database.username", "delity")
	viper.SetDefault("database.password", "delity")

	viper.SetDefault("log.level", "debug")
}

func loadConfig() {
	viper.SetConfigName("config")
	viper.AddConfigPath("./")

	viper.SetEnvPrefix("DELITY")
	viper.SetEnvKeyReplacer(strings.NewReplacer(".", "_"))
	viper.AutomaticEnv()

	err := viper.ReadInConfig()
	if err != nil {
		panic(fmt.Errorf("failed to load config: %s", err))
	}

}

func (config *databaseConfig) Dsn() string {
	return fmt.Sprintf(
		"%s:%s@(%s:%s)/%s?multiStatements=true&parseTime=true&loc=UTC&collation=utf8mb4_general_ci",
		config.Username,
		config.Password,
		config.Host,
		config.Port,
		config.Name,
	)
}

func (s *serverConfig) Url() string {
	return fmt.Sprintf("%s:%s", s.Host, s.Port)
}
