package app

import "gorm.io/gorm"

type AppVO struct {
	ID   uint   `json:"id"`
	Name string `json:"name" binding:"required"`
	Desc string `json:"desc"`
}

type AppPO struct {
	gorm.Model
	Name string `gorm:"column:name"`
	Desc string `gorm:"column:desc"`
}
