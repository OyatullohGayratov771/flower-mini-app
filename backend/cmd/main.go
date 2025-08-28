package main

import (
	"log"
	"os"

	"flower-mini-app/backend/internal/config"
	"flower-mini-app/backend/internal/db"
	"flower-mini-app/backend/internal/models"
	"flower-mini-app/backend/internal/service"
	"flower-mini-app/backend/internal/transport/http"
)

func main() {
	cfg := config.Load()
	log.Println(cfg)
	gdb := db.Connect(cfg.DBDsn)

	// Auto-migrate (dev uchun, prod’da migratsiya tool ishlating)
	if err := gdb.AutoMigrate(
		&models.User{},
		&models.Category{},
		&models.Product{},
		&models.Order{},
		&models.OrderItem{},
	); err != nil {
		log.Fatalf("automigrate: %v", err)
	}

	// Services
	ts := service.NewTelegramService(cfg.BotToken, cfg.AdminChatID)
	ps := service.NewProductService(gdb)
	osvc := service.NewOrderService(gdb, ts)
	us := service.NewUserService(gdb)
	cs := service.NewCategoryService(gdb)

	go ts.Listen()

	// Router
	r := http.NewRouter(cfg, ps, osvc, us, cs, ts)

	// Static files (upload dir)
	if _, err := os.Stat(cfg.UploadDir); os.IsNotExist(err) {
		if err := os.MkdirAll(cfg.UploadDir, 0755); err != nil {
			log.Fatalf("cannot create upload dir: %v", err)
		}
	}
	r.Static("/static", cfg.UploadDir)

	// Run server
	port := cfg.HttpPort
	host := cfg.HttpHost
	log.Printf("listening on %s:%s", host, port)
	if err := r.Run(host + ":" + port); err != nil {
		log.Fatal(err)
	}
}
