package cmd

import (
	"fmt"
	"github.com/pymba86/delity/internal/app"
	"github.com/spf13/cobra"
)

func init() {
	rootCmd.AddCommand(versionCmd)
}

var versionCmd = &cobra.Command{
	Use:   "version",
	Short: "Print the version number of the binary",
	Run: func(cmd *cobra.Command, args []string) {
		fmt.Println(app.Version())
	},
}
