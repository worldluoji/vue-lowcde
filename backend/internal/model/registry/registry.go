package registry

import "gorm.io/gorm"

type RegistryVO struct {
	ID           uint   `json:"id"`
	RegisterName string `json:"registerName" binding:"required"`
	PackageName  string `json:"packageName" binding:"required"`
	Version      string `json:"version" binding:"required"`
	AppID        uint   `json:"appId" binding:"required"`
}

type RegistryPO struct {
	gorm.Model
	RegisterName string `gorm:"column:registerName"`
	PackageName  string `gorm:"column:packageName"`
	Version      string `gorm:"column:version"`
	AppID        uint   `gorm:"column:appId"`
}

type DeleteVO struct {
	ID uint `json:"id" binding:"required"`
}
