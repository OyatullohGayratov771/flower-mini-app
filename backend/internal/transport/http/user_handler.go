package http

import (
	"net/http"

	"github.com/gin-gonic/gin"

	"flower-mini-app/backend/internal/config"
	"flower-mini-app/backend/internal/service"
)

type UserHandler struct {
	svc *service.UserService
}

func NewUserHandler(s *service.UserService) *UserHandler { return &UserHandler{svc: s} }

func (h *UserHandler) Me(c *gin.Context) {
	initData := c.GetString("tg_init")
	user, err := h.svc.Me(c.Request.Context(), initData, config.AppConfig.AdminTelegramIDs)
	if err != nil {
		c.JSON(http.StatusUnauthorized, gin.H{"error": err.Error()})
		return
	}

	c.Set("tg_id", user.TgID) 
	c.JSON(http.StatusOK, user)
}
