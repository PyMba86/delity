package resolver

import (
	"context"
	"fmt"
	"github.com/pymba86/delity/internal/entity"
)

func (r *queryResolver) Users(ctx context.Context) ([]*entity.User, error) {
	panic(fmt.Errorf("not implemented"))
}
