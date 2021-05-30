package resolver

import (
	"github.com/pymba86/delity/internal/registry"
	"github.com/pymba86/delity/pkg/log"
)

type Resolver struct{
	Services *registry.Services
	Log      log.Logger
}
