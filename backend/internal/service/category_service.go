package service

import (
	"context"
	"flower-mini-app/backend/internal/models"
	"fmt"
	"time"

	"gorm.io/gorm"
)

type CategoryService struct {
	db *gorm.DB
}

func NewCategoryService(db *gorm.DB) *CategoryService {
	return &CategoryService{db: db}
}

func (s *CategoryService) Create(ctx context.Context, cat *models.Category) error {
	cat.CreatedAt = time.Now()
	cat.UpdatedAt = time.Now()
	return s.db.WithContext(ctx).Create(cat).Error
}

func (s *CategoryService) List(ctx context.Context) ([]models.Category, error) {
	var cats []models.Category
	err := s.db.WithContext(ctx).Find(&cats).Error
	return cats, err
}

func (s *CategoryService) Delete(ctx context.Context, id string) error {
	// count products linked to this category
	var count int64
	if err := s.db.WithContext(ctx).
		Model(&models.Product{}).
		Where("category_id = ?", id).
		Count(&count).Error; err != nil {
		return err
	}

	if count > 0 {
		return fmt.Errorf("cannot delete category: %d products linked", count)
	}

	// safe to delete
	return s.db.WithContext(ctx).Delete(&models.Category{}, id).Error
}
