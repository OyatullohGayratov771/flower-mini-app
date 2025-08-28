package http

import (
	"flower-mini-app/backend/internal/models"
	"flower-mini-app/backend/internal/models/dto"
	"flower-mini-app/backend/internal/service"
	"net/http"
	"strings"

	"github.com/gin-gonic/gin"
)

type CategoryHandler struct {
	svc *service.CategoryService
}

func NewCategoryHandler(svc *service.CategoryService) *CategoryHandler {
	return &CategoryHandler{svc: svc}
}

// POST /api/admin/categories
func (h *CategoryHandler) Create(c *gin.Context) {
	var in dto.CategoryCreateDTO
	if err := c.ShouldBindJSON(&in); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	cat := models.Category{
		Name: in.Name,
		Slug: in.Slug,
	}

	if err := h.svc.Create(c.Request.Context(), &cat); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, cat)
}

// GET /api/categories
func (h *CategoryHandler) List(c *gin.Context) {
	cats, err := h.svc.List(c.Request.Context())
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, cats)
}

// DELETE /api/admin/categories/:id
func (h *CategoryHandler) Delete(c *gin.Context) {
	id := c.Param("id")
	if err := h.svc.Delete(c.Request.Context(), id); err != nil {
		// FK constraint error (category has products)
		if strings.Contains(err.Error(), "violates foreign key constraint") {
			c.JSON(http.StatusBadRequest, gin.H{
				"error": "Bu categoryni o‘chirib bo‘lmaydi, chunki unga bog‘langan mahsulotlar mavjud",
			})
			return
		}

		// boshqa errorlar uchun
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "category deleted"})
}
