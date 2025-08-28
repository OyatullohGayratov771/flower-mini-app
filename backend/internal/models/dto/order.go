package dto

type OrderItemCreateDTO struct {
	ProductID  int64 `json:"product_id"`
	Qty        int  `json:"qty"`
	PriceCents int  `json:"price_cents"`
}

type OrderCreateDTO struct {
	Address string               `json:"address"`
	Phone   string               `json:"phone"`
	Note    string               `json:"note"`
	Items   []OrderItemCreateDTO `json:"items"`
}

type OrderUpdateStatusDTO struct {
	Status string `json:"status"`
}
