package registry

import (
	"log"
	"net/http"
	"time"

	"github.com/gin-gonic/gin"
	"gorm.io/gorm"

	"backend/internal/model/registry"
	"backend/internal/utils"
)

type RegistryVO registry.RegistryVO

type RegistryPO registry.RegistryPO

type DeleteVO registry.DeleteVO

// TableName maps to mysql table name.
func (p *RegistryPO) TableName() string {
	return "registry"
}

type RegistryHandler struct {
	registries []RegistryVO
}

func NewRegistryHandler() *RegistryHandler {
	return &RegistryHandler{
		registries: nil,
	}
}

var db *gorm.DB

func init() {
	db = utils.GetDB()
	db.AutoMigrate(&RegistryPO{})
}

func (u *RegistryHandler) GetRegistriesByAppId(c *gin.Context) {
	appId, ok := c.GetQuery("appId")
	if !ok {
		c.JSON(http.StatusBadRequest, gin.H{"error": "fail to get appId"})
		return
	}
	log.Println(appId)
	var registries []RegistryPO
	if err := db.Where("appId = ?", appId).Find(&registries).Error; err != nil {
		log.Fatalf("Get registry error: %v", err)
	}
	n := len(registries)
	if n > 0 {
		u.registries = make([]RegistryVO, n)
		for i := 0; i < n; i++ {
			u.registries[i] = RegistryVO{
				ID:           registries[i].ID,
				RegisterName: registries[i].RegisterName,
				PackageName:  registries[i].PackageName,
				Version:      registries[i].Version,
				AppID:        registries[i].AppID,
			}
		}
	} else {
		u.registries = nil
	}

	c.JSON(http.StatusOK, u.registries)
}

func (u *RegistryHandler) CreateRegistry(c *gin.Context) {
	var registryVO RegistryVO
	if err := c.ShouldBindJSON(&registryVO); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	registry := &RegistryPO{}
	registry.RegisterName = registryVO.RegisterName
	registry.PackageName = registryVO.PackageName
	registry.Version = registryVO.Version
	registry.AppID = registryVO.AppID
	registry.CreatedAt = time.Now()
	if err := db.Create(registry).Error; err != nil {
		log.Printf("Create error: %v", err)
		c.JSON(http.StatusInternalServerError, registryVO)
		return
	}

	log.Printf("Create registry %s success", registry.RegisterName)

	registryVO.ID = registry.ID
	c.JSON(http.StatusOK, registryVO)
}

func (u *RegistryHandler) DeleteRegistry(c *gin.Context) {
	var deleteVO DeleteVO
	if err := c.ShouldBindJSON(&deleteVO); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	id := deleteVO.ID
	if err := db.Where("ID = ?", id).Delete(&RegistryPO{}).Error; err != nil {
		log.Printf("Delete registry error: %v", err)
		c.JSON(http.StatusOK, "failed")
		return
	}
	c.JSON(http.StatusOK, "success")
}
