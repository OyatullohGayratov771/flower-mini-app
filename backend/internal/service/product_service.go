package service

import (
	"context"
	"errors"
	"log"
	"strings"

	"flower-mini-app/backend/internal/models"

	"gorm.io/gorm"
)

type ProductService struct {
	db *gorm.DB

}

func NewProductService(db *gorm.DB) *ProductService {
	return &ProductService{db: db}
}


// 🔹 Public list (faqat active productlar)
func (s *ProductService) List(ctx context.Context) ([]models.Product, error) {
	var products []models.Product
	if err := s.db.WithContext(ctx).Where("active = ?", true).Find(&products).Error; err != nil {
		return nil, err
	}
	return products, nil
}

// 🔹 Admin list (hammasini)
func (s *ProductService) AdminList(ctx context.Context) ([]models.Product, error) {
	var products []models.Product
	if err := s.db.WithContext(ctx).Find(&products).Error; err != nil {
		return nil, err
	}
	log.Println("AdminList products:", products)
	return products, nil
}

// 🔹 Get product by slug
func (s *ProductService) GetBySlug(ctx context.Context, slug string) (*models.Product, error) {
	var p models.Product
	if err := s.db.WithContext(ctx).Where("slug = ?", slug).First(&p).Error; err != nil {
		if errors.Is(err, gorm.ErrRecordNotFound) {
			return nil, nil
		}
		return nil, err
	}
	return &p, nil
}


// 🔹 Create product
func (s *ProductService) Create(ctx context.Context, in models.ProductCreateDTO) (*models.Product, error) {
	if in.Slug == "" {
		in.Slug = strings.ToLower(strings.ReplaceAll(in.Name, " ", "-"))
	}

	p := &models.Product{
		Name:        in.Name,
		Slug:        in.Slug,
		Description: in.Description,
		PriceCents:  in.PriceCents,
		Currency:    defaultStr(in.Currency, "UZS"),
		ImageURL:    in.ImageURL,
		Stock:       in.Stock,
		Active:      true,
	}

	if in.CategoryID != nil {
		p.CategoryID = in.CategoryID
	}
	if in.Active != nil {
		p.Active = *in.Active
	}

	if err := s.db.WithContext(ctx).Create(p).Error; err != nil {
		return nil, err
	}
	return p, nil
}

// 🔹 Update product
func (s *ProductService) Update(ctx context.Context, id string, in models.ProductUpdateDTO) (*models.Product, error) {
	var p models.Product
	if err := s.db.WithContext(ctx).First(&p, "id = ?", id).Error; err != nil {
		return nil, err
	}

	if in.Name != nil {
		p.Name = *in.Name
	}
	if in.Slug != nil {
		p.Slug = *in.Slug
	}
	if in.Description != nil {
		p.Description = *in.Description
	}
	if in.PriceCents != nil {
		p.PriceCents = *in.PriceCents
	}
	if in.Currency != nil {
		p.Currency = *in.Currency
	}
	if in.ImageURL != nil {
		p.ImageURL = *in.ImageURL
	}
	if in.CategoryID != nil {
		p.CategoryID = in.CategoryID
	}
	if in.Stock != nil {
		p.Stock = *in.Stock
	}
	if in.Active != nil {
		p.Active = *in.Active
	}

	if err := s.db.WithContext(ctx).Save(&p).Error; err != nil {
		return nil, err
	}
	return &p, nil
}

// 🔹 Delete product
func (s *ProductService) Delete(ctx context.Context, id string) error {
	if err := s.db.WithContext(ctx).Delete(&models.Product{}, "id = ?", id).Error; err != nil {
		return err
	}
	return nil
}


// 🔹 helper
func defaultStr(v, def string) string {
	if v == "" {
		return def
	}
	return v
}
