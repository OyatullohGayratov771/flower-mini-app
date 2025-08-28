package config

import (
	"fmt"
	"log"
	"os"
	"strings"

	"github.com/joho/godotenv"
)

type Config struct {
	AppEnv           string
	HttpHost         string
	HttpPort         string
	DBDsn            string
	BotToken         string
	AdminChatID      string
	AdminTelegramIDs map[int64]bool
	BaseURL          string
	UploadDir        string
}

var AppConfig *Config

func Load() *Config {
	// .env yuklash
	if err := godotenv.Load("../.env"); err != nil {
		log.Println(err)
		log.Println("⚠️ No .env file found, using system env vars")
	}

	admins := map[int64]bool{}
	if s := os.Getenv("ADMIN_TELEGRAM_IDS"); s != "" {
		for _, v := range strings.Split(s, ",") {
			var id int64
			_, err := fmt.Sscanf(strings.TrimSpace(v), "%d", &id)
			if err == nil && id != 0 {
				admins[id] = true
			}
		}
	}

	AppConfig = &Config{
		AppEnv:           get("APP_ENV", "dev"),
		HttpHost:         get("HTTP_HOST", "localhost"),
		HttpPort:         get("HTTP_PORT", "8080"),
		DBDsn:            must("DB_DSN"),
		BotToken:         must("BOT_TOKEN"),
		AdminChatID:      os.Getenv("ADMIN_CHAT_ID"), // optional
		AdminTelegramIDs: admins,
		BaseURL:          get("BASE_URL", "http://localhost:8080"),
		UploadDir:        get("UPLOAD_DIR", "./uploads"),
	}

	return AppConfig
}

// optional env (agar bo‘lmasa defaultni oladi)
func get(key, def string) string {
	if v := os.Getenv(key); v != "" {
		return v
	}
	return def
}

// majburiy env (agar bo‘lmasa xato)
func must(key string) string {
	if v := os.Getenv(key); v != "" {
		return v
	}
	log.Fatalf("❌ %s is required but not set", key)
	return ""
}
