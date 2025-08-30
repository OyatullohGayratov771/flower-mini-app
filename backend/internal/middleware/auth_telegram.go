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
			// initData = "query_id=AAHhnWdHAgAAAOGdZ0c96lqb&user=%7B%22id%22%3A5492940257%2C%22first_name%22%3A%22G%E2%80%99ayratov%22%2C%22last_name%22%3A%22Oyatulloh%22%2C%22username%22%3A%22x_azamat_x%22%2C%22language_code%22%3A%22en%22%2C%22allows_write_to_pm%22%3Atrue%2C%22photo_url%22%3A%22https%3A%5C%2F%5C%2Ft.me%5C%2Fi%5C%2Fuserpic%5C%2F320%5C%2F7ushqs9UUsip5nj_X5YdRc8gkRgi-0SqayComdzHKpetHyQb0zBm6hhEPOichyIA.svg%22%7D&auth_date=1755915216&signature=etzC0-uRqm6EzRD64Sfl7wLml--PjPnCy00lnnwS-0bYCoJOkkLHrA15thTdDsQRQphL7NB-26QAqUvc4Uy1Aw&hash=9e1bc2a4e0a3e6a2e30e78d5ff037b161841e6a60c424f0accd9e09b314bbb61"
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
