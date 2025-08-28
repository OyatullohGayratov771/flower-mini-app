package middleware

import (
	"net/http"
	"github.com/gin-gonic/gin"
	"flower-mini-app/backend/internal/config"
)

func AdminOnly(cfg *config.Config) gin.HandlerFunc {
	return func(c *gin.Context) {
		tgID, ok := c.Get("tg_id") // set in user load middleware/handler
		if !ok {
			c.AbortWithStatusJSON(http.StatusUnauthorized, gin.H{"error":"unauthorized"})
			return
		}
		id64 := tgID.(int64)
		if !cfg.AdminTelegramIDs[id64] {
			c.AbortWithStatusJSON(http.StatusForbidden, gin.H{"error":"forbidden"})
			return
		}
		c.Next()
	}
}