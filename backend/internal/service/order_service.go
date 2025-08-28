package service

import (
	"context"
	"errors"
	"flower-mini-app/backend/internal/models"
	"flower-mini-app/backend/internal/models/dto"
	"fmt"
	"log"

	"gorm.io/gorm"
)

type OrderService struct {
	db *gorm.DB
	ts *TelegramService
}

func NewOrderService(db *gorm.DB, ts *TelegramService) *OrderService {
	return &OrderService{db: db, ts: ts}
}

// Create yangi order yaratadi
func (s *OrderService) Create(ctx context.Context, userID int64, in dto.OrderCreateDTO) (*models.Order, error) {
	if len(in.Items) == 0 {
		return nil, errors.New("order items required")
	}

	order := &models.Order{
		UserID:   userID,
		Address:  in.Address,
		Phone:    in.Phone,
		Note:     in.Note,
		Currency: "UZS",
		Status:   "pending",
	}

	// hisoblash
	var total int
	var items []models.OrderItem
	for _, item := range in.Items {
		total += item.PriceCents * item.Qty
		items = append(items, models.OrderItem{
			ProductID:  item.ProductID,
			Qty:        item.Qty,
			PriceCents: item.PriceCents,
		})
	}
	order.TotalCents = total
	order.Items = items

	if err := s.db.WithContext(ctx).Create(order).Error; err != nil {
		return nil, err
	}

	msg := fmt.Sprintf(
		"🆕 Yangi buyurtma!\n\n📦 OrderID: %d\n👤 UserID: %d\n💰 Jami: %d %s\n📞 Telefon: %s\n🏠 Manzil: %s",
		order.ID, userID, order.TotalCents, order.Currency, order.Phone, order.Address,
	)
	if err := s.ts.SendAdmin(msg); err != nil {
		log.Printf("admin xabar yuborishda xato: %v", err)
	}

	return order, nil
}

// ListByUser foydalanuvchining orderlarini chiqaradi
func (s *OrderService) ListByUser(ctx context.Context, userID int64) ([]models.Order, error) {
	var orders []models.Order
	if err := s.db.WithContext(ctx).
		Preload("Items.Product").
		Where("user_id = ?", userID).
		Order("created_at desc").
		Find(&orders).Error; err != nil {
		return nil, err
	}
	return orders, nil
}

// GetByID bitta orderni olish
func (s *OrderService) GetByID(ctx context.Context, id int64, userID int64) (*models.Order, error) {
	var order models.Order
	if err := s.db.WithContext(ctx).
		Preload("Items.Product").
		Where("id = ? AND user_id = ?", id, userID).
		First(&order).Error; err != nil {
		return nil, err
	}
	return &order, nil
}

// Cancel foydalanuvchi o'z orderini bekor qiladi
func (s *OrderService) Cancel(ctx context.Context, id int64, userID int64) error {
	return s.db.WithContext(ctx).
		Model(&models.Order{}).
		Where("id = ? AND user_id = ? AND status = ?", id, userID, "pending").
		Update("status", "canceled").Error
}

// Admin uchun statusni yangilash
func (s *OrderService) SetStatus(ctx context.Context, id int64, status string) error {
	return s.db.WithContext(ctx).
		Model(&models.Order{}).
		Where("id = ?", id).
		Update("status", status).Error
}

// Admin uchun hamma orderlarni olish
func (s *OrderService) ListAll(ctx context.Context) ([]models.Order, error) {
	var orders []models.Order
	if err := s.db.WithContext(ctx).
		Preload("User").
		Preload("Items.Product").
		Order("created_at desc").
		Find(&orders).Error; err != nil {
		return nil, err
	}
	return orders, nil
}
