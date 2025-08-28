package http

import (
	"flower-mini-app/backend/internal/config"
	"flower-mini-app/backend/internal/middleware"
	"flower-mini-app/backend/internal/service"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"time"
)

func NewRouter(cfg *config.Config, ps *service.ProductService, os *service.OrderService, us *service.UserService,cs *service.CategoryService, ts *service.TelegramService) *gin.Engine {
	r := gin.Default()

	// ✅ CORS
	r.Use(cors.New(cors.Config{
		AllowOrigins:     []string{"*"}, // ⚠️ prod uchun frontend URL yozish kerak
		AllowMethods:     []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"},
		AllowHeaders:     []string{"Origin", "Content-Type", "Accept", "X-Telegram-InitData"},
		ExposeHeaders:    []string{"Content-Length"},
		AllowCredentials: true,
		MaxAge:           12 * time.Hour,

	}))

	// ✅ Health
	r.GET("/ping", func(c *gin.Context) { c.JSON(200, gin.H{"message": "pong"}) })

	// ✅ Handlers
	ph := NewProductHandler(ps, ts)
	oh := NewOrderHandler(os)
	uh := NewUserHandler(us)
	ch := NewCategoryHandler(cs)

	// 🔹 Public API (authsiz)
	public := r.Group("/api")
	{	
		public.GET("/categories", ch.List)
		public.GET("/products", ph.List)
		public.GET("/products/:slug", ph.GetBySlug)
	}

	// 🔹 User (Telegram auth bilan)
	user := r.Group("/api/user", middleware.TelegramAuth(cfg, us))
	{
		user.GET("/me", uh.Me)
		// user.PUT("/me", uh.Update)

		user.GET("/orders", oh.ListByUser)
		user.POST("/orders", oh.Create)
		user.GET("/orders/:id", oh.GetByID)
		user.POST("/orders/:id/cancel", oh.Cancel)
		// user.POST("/orders/:id/pay", oh.Pay)
	}

	// 🔹 Admin (Telegram + AdminOnly)
	admin := r.Group("/api/admin", middleware.TelegramAuth(cfg, us), middleware.AdminOnly(cfg))
	{
		// categories
		admin.POST("/categories", ch.Create)
		admin.DELETE("/categories/:id", ch.Delete)
		// products
		admin.GET("/products", ph.AdminList)
		admin.POST("/products", ph.Create)
		admin.PUT("/products/:id", ph.Update)
		admin.DELETE("/products/:id", ph.Delete)
		// product photos
		admin.POST("/products/upload_photo", ph.UploadPhoto)

		// orders
		admin.GET("/orders", oh.List)
		admin.PUT("/orders/:id/status", oh.SetStatus)
	}

	return r
}
