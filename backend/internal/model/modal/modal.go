package modal

import "gorm.io/gorm"

type ModalVO struct {
	ID      uint   `json:"id"`
	Name    string `json:"name" binding:"required"`
	Type    string `json:"type" binding:"required"`
	Desc    string `json:"desc"`
	Content string `json:"content"`
	PageID  uint   `json:"pageId"`
}

type ModalPO struct {
	gorm.Model
	Name    string `gorm:"column:name"`
	Type    string `gorm:"column:type"`
	Desc    string `gorm:"column:desc"`
	Content string `gorm:"column:content"`
	PageID  uint   `gorm:"column:pageId"`
}
