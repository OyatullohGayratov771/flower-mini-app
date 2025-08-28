package dto

type CategoryCreateDTO struct {
    Name string `json:"name" binding:"required"`
    Slug string `json:"slug"`
}
