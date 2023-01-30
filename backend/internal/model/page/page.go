package page

import "gorm.io/gorm"

type PageVO struct {
	ID    uint   `json:"id"`
	Name  string `json:"name" binding:"required"`
	Path  string `json:"path" binding:"required"`
	Desc  string `json:"desc"`
	AppID uint   `json:"appId"`
}

type PagePO struct {
	gorm.Model
	Name  string `gorm:"column:name"`
	Path  string `gorm:"column:path"`
	Desc  string `gorm:"column:desc"`
	AppID uint   `gorm:"column:appId"`
}
