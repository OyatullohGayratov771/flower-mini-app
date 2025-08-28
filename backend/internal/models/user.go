package models
import "time"

type User struct {
	ID        int64     `gorm:"primaryKey"`
	TgID      int64     `gorm:"uniqueIndex"`
	Username  *string
	FirstName *string
	LastName  *string
	Role      string    `gorm:"default:user"`
	CreatedAt time.Time
	UpdatedAt time.Time
}
