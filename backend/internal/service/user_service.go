package service

import (
	"context"
	"encoding/json"
	"errors"
	"fmt"
	"net/url"
	"strings"
	"time"

	"flower-mini-app/backend/internal/models"

	"gorm.io/gorm"
)

type UserService struct {
	db *gorm.DB
}

func NewUserService(db *gorm.DB) *UserService {
	return &UserService{db: db}
}

type TelegramUser struct {
	ID        int64  `json:"id"`
	Username  string `json:"username"`
	FirstName string `json:"first_name"`
	LastName  string `json:"last_name"`
}

// Me – Telegram initData’dan userni olish va upsert qilish
func (s *UserService) Me(ctx context.Context, tgInitData string, adminIDs map[int64]bool) (*models.User, error) {
	var tgUser TelegramUser
	found := false

	for _, kv := range parseQuery(tgInitData) {
		if kv.Key == "user" {
			decoded, err := url.QueryUnescape(kv.Value)
			if err != nil {
				return nil, fmt.Errorf("failed to decode user json: %w", err)
			}
			if err := json.Unmarshal([]byte(decoded), &tgUser); err != nil {
				return nil, fmt.Errorf("parse user json: %w", err)
			}
			found = true
			break
		}
	}
	if !found {
		return nil, fmt.Errorf("user field not found in initData")
	}

	role := "user"
	if adminIDs[tgUser.ID] {
		role = "admin"
	}

	var user models.User
	err := s.db.WithContext(ctx).Where("tg_id = ?", tgUser.ID).First(&user).Error
	if errors.Is(err, gorm.ErrRecordNotFound) {
		user = models.User{
			TgID:      tgUser.ID,
			Username:  &tgUser.Username,
			FirstName: &tgUser.FirstName,
			LastName:  &tgUser.LastName,
			Role:      role,
			CreatedAt: time.Now(),
			UpdatedAt: time.Now(),
		}
		if err := s.db.WithContext(ctx).Create(&user).Error; err != nil {
			return nil, err
		}
	} else if err == nil {
		user.Username = &tgUser.Username
		user.FirstName = &tgUser.FirstName
		user.LastName = &tgUser.LastName
		user.UpdatedAt = time.Now()

		// agar admin bo‘lsa role yangilaymiz
		if role == "admin" && user.Role != "admin" {
			user.Role = "admin"
		}

		if err := s.db.WithContext(ctx).Save(&user).Error; err != nil {
			return nil, err
		}
	} else {
		return nil, err
	}

	return &user, nil
}

// util: parse querystring "a=1&b=2"
type kv struct{ Key, Value string }

func parseQuery(qs string) []kv {
	var out []kv
	parts := strings.Split(qs, "&")
	for _, p := range parts {
		if eq := strings.Index(p, "="); eq != -1 {
			out = append(out, kv{
				Key:   p[:eq],
				Value: p[eq+1:],
			})
		}
	}
	return out
}
