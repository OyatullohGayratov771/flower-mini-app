package models

import (
	"time"
)

type Order struct {
	ID         int64  `gorm:"primaryKey"`
	UserID     int64  `gorm:"index"`
	TotalCents int    `gorm:"not null"`
	Currency   string `gorm:"type:text;default:UZS"`
	Status     string `gorm:"type:text;default:pending"` // pending|paid|canceled|delivered
	Address    string
	Phone      string
	Note       string
	CreatedAt  time.Time `gorm:"autoCreateTime"`
	UpdatedAt  time.Time `gorm:"autoUpdateTime"`

	// Relations
	User  *User       `gorm:"foreignKey:UserID"`
	Items []OrderItem `gorm:"foreignKey:OrderID"`
}

type OrderItem struct {
	ID         int64 `gorm:"primaryKey"`
	OrderID    int64 `gorm:"index"`
	ProductID  int64 `gorm:"index;not null"`
	Qty        int   `gorm:"not null"`
	PriceCents int   `gorm:"not null"`

	// Relations
	Product *Product `gorm:"foreignKey:ProductID"`
}
