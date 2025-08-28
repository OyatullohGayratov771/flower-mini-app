package middleware

import (
	"flower-mini-app/backend/internal/config"
	"flower-mini-app/backend/internal/service"
	"log"
	"net/http"

	"github.com/gin-gonic/gin"
)

// TelegramAuth — Telegram initData orqali foydalanuvchini autentifikatsiya qilish middleware
func TelegramAuth(cfg *config.Config, userSvc *service.UserService) gin.HandlerFunc {
	return func(c *gin.Context) {
		// 1. initData olish (header yoki query paramdan)
		initData := c.GetHeader("X-Telegram-InitData")
		
		if initData == "" {
			initData = c.Query("init_data")
		}
		if initData == "" {
			c.AbortWithStatusJSON(http.StatusUnauthorized, gin.H{"error": "missing initData"})
			return
		}

		// 2. initData tekshirish
		// valid, err := utils.VerifyTelegramInitData(initData, cfg.BotToken)
		// if err != nil {
		// 	log.Println("Telegram initData verification error:", err)
		// 	c.AbortWithStatusJSON(http.StatusUnauthorized, gin.H{"error": err.Error()})
		// 	return
		// }
		// if !valid {
		// 	c.AbortWithStatusJSON(http.StatusUnauthorized, gin.H{"error": "unauthorized"})
		// 	return
		// }

		// 3. UserService orqali userni olish yoki yaratish
		user, err := userSvc.Me(c.Request.Context(), initData, cfg.AdminTelegramIDs)
		if err != nil {
			log.Println("UserService.Me error:", err)
			c.AbortWithStatusJSON(http.StatusUnauthorized, gin.H{"error": err.Error()})
			return
		}

		// 4. Contextga yozish
		// log.Println(initData)
		c.Set("tg_init", initData)
		c.Set("tg_id", user.TgID)
		c.Set("user", user)

		c.Next()
	}
}
