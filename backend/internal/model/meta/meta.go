package meta

import "gorm.io/gorm"

type MetaVO struct {
	ID      uint   `json:"id"`
	Content string `json:"content"`
	PageID  uint   `json:"pageId"`
}

type MetaPO struct {
	gorm.Model
	Content string `gorm:"column:content"`
	PageID  uint   `gorm:"column:pageId"`
}
