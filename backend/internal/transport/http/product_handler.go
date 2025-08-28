package http

import (
	"flower-mini-app/backend/internal/models"
	"flower-mini-app/backend/internal/service"
	"net/http"

	"github.com/gin-gonic/gin"
)

type ProductHandler struct {
	service *service.ProductService
	tgSvc   *service.TelegramService
}

func NewProductHandler(s *service.ProductService, tgSvc *service.TelegramService) *ProductHandler {
	return &ProductHandler{service: s, tgSvc: tgSvc}
}

// 🔹 Public – product list
func (h *ProductHandler) List(c *gin.Context) {
	products, err := h.service.List(c)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, products)
}

// 🔹 Public – product by slug
func (h *ProductHandler) GetBySlug(c *gin.Context) {
	slug := c.Param("slug")
	product, err := h.service.GetBySlug(c, slug)
	if err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "not found"})
		return
	}
	c.JSON(http.StatusOK, product)
}

// 🔹 Admin – create
func (h *ProductHandler) Create(c *gin.Context) {
	var dto models.ProductCreateDTO
	if err := c.ShouldBindJSON(&dto); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	p, err := h.service.Create(c, dto)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusCreated, p)
}

// 🔹 Admin – list all (even inactive)
func (h *ProductHandler) AdminList(c *gin.Context) {
	products, err := h.service.AdminList(c)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, products)
}

// 🔹 Admin – update
func (h *ProductHandler) Update(c *gin.Context) {
	id := c.Param("id")
	var dto models.ProductUpdateDTO
	if err := c.ShouldBindJSON(&dto); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	p, err := h.service.Update(c, id, dto)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, p)
}

// 🔹 Admin – delete
func (h *ProductHandler) Delete(c *gin.Context) {
	id := c.Param("id")
	if err := h.service.Delete(c, id); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"status": "deleted"})
}

// 🔹 Admin – upload photo
func (h *ProductHandler) UploadPhoto(c *gin.Context) {
	type Req struct {
		URL     string `json:"url"`     // Frontenddan yuborilgan rasm URL
		Caption string `json:"caption"` // optional
	}

	var req Req
	if err := c.BindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	fileID, err := h.tgSvc.SendPhoto(req.URL, req.Caption)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	// file_id-ni saqlash uchun DB ga yozishingiz mumkin
	c.JSON(http.StatusOK, gin.H{"file_id": fileID})
}
