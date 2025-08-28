package models
import "time"

type Category struct {
	ID        int64     `gorm:"primaryKey"`
	Name      string
	Slug      string    `gorm:"uniqueIndex"`
	CreatedAt time.Time
	UpdatedAt time.Time
}

type Product struct {
	ID         int64     `gorm:"primaryKey"`
	Name       string
	Slug       string    `gorm:"uniqueIndex"`
	Description string
	PriceCents int
	Currency   string
	ImageURL   string
	CategoryID *int64
	Category   *Category `gorm:"foreignKey:CategoryID"`
	Active     bool
	Stock      int
	CreatedAt  time.Time
	UpdatedAt  time.Time
}

type ProductCreateDTO struct {
	Name        string `json:"name" binding:"required"`
	Slug        string `json:"slug"`
	Description string `json:"description"`
	PriceCents  int    `json:"price_cents" binding:"required"`
	Currency    string `json:"currency"`
	ImageURL    string `json:"image_url"`
	CategoryID  *int64 `json:"category_id"`
	Stock       int    `json:"stock"`
	Active      *bool  `json:"active"`
}

type ProductUpdateDTO struct {
	Name        *string `json:"name"`
	Slug        *string `json:"slug"`
	Description *string `json:"description"`
	PriceCents  *int    `json:"price_cents"`
	Currency    *string `json:"currency"`
	ImageURL    *string `json:"image_url"`
	CategoryID  *int64  `json:"category_id"`
	Stock       *int    `json:"stock"`
	Active      *bool   `json:"active"`
}