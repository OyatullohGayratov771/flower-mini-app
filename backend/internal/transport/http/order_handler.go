package http

import (
	"flower-mini-app/backend/internal/models/dto"
	"flower-mini-app/backend/internal/service"
	"net/http"
	"strconv"

	"github.com/gin-gonic/gin"
)

type OrderHandler struct {
	s *service.OrderService
}

func NewOrderHandler(s *service.OrderService) *OrderHandler {
	return &OrderHandler{s: s}
}

// ✅ 1. Foydalanuvchi yangi order yaratadi
func (h *OrderHandler) Create(c *gin.Context) {
	var dto dto.OrderCreateDTO
	if err := c.ShouldBindJSON(&dto); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	userID := c.GetInt64("user_id") // middleware’dan keladi
	order, err := h.s.Create(c.Request.Context(), userID, dto)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusCreated, order)
}

// ✅ 2. Foydalanuvchi o‘z buyurtmalarini ko‘radi
func (h *OrderHandler) ListByUser(c *gin.Context) {
	userID := c.GetInt64("user_id") // middleware’dan keladi
	orders, err := h.s.ListByUser(c.Request.Context(), userID)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, orders)
}

// ✅ 3. Foydalanuvchi bitta orderni ko‘radi
func (h *OrderHandler) GetByID(c *gin.Context) {
	id, _ := strconv.ParseInt(c.Param("id"), 10, 64)
	userID := c.GetInt64("user_id") // middleware’dan keladi
	order, err := h.s.GetByID(c.Request.Context(), id, userID)
	if err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, order)
}

// ✅ 4. Foydalanuvchi orderni bekor qiladi
func (h *OrderHandler) Cancel(c *gin.Context) {
	id, _ := strconv.ParseInt(c.Param("id"), 10, 64)
	userID := c.GetInt64("user_id") // middleware’dan keladi
	err := h.s.Cancel(c.Request.Context(), id, userID)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"status": "canceled"})
}

// ✅ 5. Foydalanuvchi orderni to‘laydi
// func (h *OrderHandler) Pay(c *gin.Context) {
// 	id, _ := strconv.ParseInt(c.Param("id"), 10, 64)
// 	err := h.s.Pay(c.Request.Context(), id)
// 	if err != nil {
// 		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
// 		return
// 	}
// 	c.JSON(http.StatusOK, gin.H{"status": "paid"})
// }

// ✅ 6. Admin barcha orderlarni ko‘radi
func (h *OrderHandler) List(c *gin.Context) {
	orders, err := h.s.ListAll(c.Request.Context())
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, orders)
}

// ✅ 7. Admin order statusini o‘zgartiradi
func (h *OrderHandler) SetStatus(c *gin.Context) {
	id, _ := strconv.ParseInt(c.Param("id"), 10, 64)
	var dto struct {
		Status string `json:"status" binding:"required"`
	}
	if err := c.ShouldBindJSON(&dto); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	if err := h.s.SetStatus(c.Request.Context(), id, dto.Status); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"status": dto.Status})
}
