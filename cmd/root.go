package cmd

import (
	"fmt"
	"github.com/pymba86/delity/internal/app"
	"github.com/pymba86/delity/pkg/log"
	"github.com/spf13/cobra"
	"os"
)

var rootCmd = &cobra.Command{
	Use:   "delity",
	Short: "delity is an open source task management",
	Run: func(cmd *cobra.Command, args []string) {
		fmt.Println("Please provide an argument. Use help to get more information")
	},
}

func Execute() error {
	return rootCmd.Execute()
}

func boot() *app.Engine {

	engine, err := app.New()

	if err != nil {
		logger := log.New(os.Stderr, "debug")
		logger.Fatalf("failed to boot engine: %s", err)
		os.Exit(2)
	}

	return engine
}
