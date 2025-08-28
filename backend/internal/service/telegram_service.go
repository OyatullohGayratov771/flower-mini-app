package service

import (
	"bytes"
	"encoding/json"
	"fmt"
	"log"
	"net/http"

	tgbotapi "github.com/go-telegram-bot-api/telegram-bot-api/v5"
)

type TelegramService struct {
	BotToken    string
	AdminChatID string // group/channel id
	bot         *tgbotapi.BotAPI
}

func NewTelegramService(token, chatID string) *TelegramService {
	bot, err := tgbotapi.NewBotAPI(token)
	if err != nil {
		log.Fatalf("failed to init telegram bot: %v", err)
	}
	return &TelegramService{BotToken: token, AdminChatID: chatID, bot: bot}
}

// Admin’ga xabar yuborish
func (t *TelegramService) SendAdmin(msg string) error {
	if t.AdminChatID == "" {
		return nil
	}
	url := fmt.Sprintf("https://api.telegram.org/bot%s/sendMessage", t.BotToken)
	body := map[string]any{"chat_id": t.AdminChatID, "text": msg, "parse_mode": "HTML"}
	b, _ := json.Marshal(body)

	resp, err := http.Post(url, "application/json", bytes.NewReader(b))
	if err != nil {
		return err
	}
	defer resp.Body.Close()

	if resp.StatusCode >= 300 {
		return fmt.Errorf("telegram status %d", resp.StatusCode)
	}
	return nil
}
func (t *TelegramService) SendPhoto(photoURL, caption string) (string, error) {
	url := fmt.Sprintf("https://api.telegram.org/bot%s/sendPhoto", t.BotToken)

	body := map[string]any{
		"chat_id": "@flower_shop_photos",
		"photo":   photoURL, // Telegramga file_id yoki URL yuborish mumkin
		"caption": caption,
	}

	b, _ := json.Marshal(body)
	resp, err := http.Post(url, "application/json", bytes.NewReader(b))
	if err != nil {
		return "", err
	}
	defer resp.Body.Close()

	if resp.StatusCode >= 300 {
		return "", fmt.Errorf("telegram status %d", resp.StatusCode)
	}

	// Telegram javobidan file_id olish
	var result struct {
		OK     bool `json:"ok"`
		Result struct {
			Photo []struct {
				FileID string `json:"file_id"`
			} `json:"photo"`
		} `json:"result"`
	}
	json.NewDecoder(resp.Body).Decode(&result)

	if len(result.Result.Photo) == 0 {
		return "", fmt.Errorf("no photo_id returned")
	}

	return result.Result.Photo[len(result.Result.Photo)-1].FileID, nil
}

// Oddiy echo listener (long polling)
func (t *TelegramService) Listen() {
	u := tgbotapi.NewUpdate(0)
	u.Timeout = 30

	updates := t.bot.GetUpdatesChan(u)

	for update := range updates {
		if update.Message == nil {
			continue
		}

		chatID := update.Message.Chat.ID
		text := update.Message.Text

		// Echo reply
		msg := tgbotapi.NewMessage(chatID, "Siz yozdingiz: "+text)
		t.bot.Send(msg)
	}
}
