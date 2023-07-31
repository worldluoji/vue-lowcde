package registry

import (
	"log"
	"net/http"
	"time"

	"github.com/gin-gonic/gin"
	"gorm.io/gorm"

	"backend/internal/model/registry"
	"backend/internal/model/response"
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

type Response response.Response

func (u *RegistryHandler) GetRegistriesByAppId(c *gin.Context) {
	var res Response
	appId, ok := c.GetQuery("appId")
	if !ok {
		log.Println("fail to get appId")
		res.Code = http.StatusBadRequest
		res.Message = "fail to get appId"
		c.JSON(http.StatusBadRequest, res)
		return
	}
	log.Println(appId)
	var registries []RegistryPO
	if err := db.Where("appId = ?", appId).Find(&registries).Error; err != nil {
		log.Printf("get params error: %v", err)
		res.Code = http.StatusInternalServerError
		res.Message = "fail to get registry"
		c.JSON(http.StatusBadRequest, res)
		return
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

	res.Code = 0
	res.Data = u.registries
	c.JSON(http.StatusOK, res)
}

func (u *RegistryHandler) CreateRegistry(c *gin.Context) {
	var res Response
	var registryVO RegistryVO
	if err := c.ShouldBindJSON(&registryVO); err != nil {
		res.Code = http.StatusBadRequest
		res.Message = "fail to get params"
		c.JSON(http.StatusBadRequest, res)
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
		res.Code = http.StatusInternalServerError
		res.Message = "create resigtry error"
		c.JSON(http.StatusInternalServerError, res)
		return
	}

	log.Printf("Create registry %s success", registry.RegisterName)

	registryVO.ID = registry.ID
	res.Code = 0
	res.Data = registryVO
	c.JSON(http.StatusOK, res)
}

func (u *RegistryHandler) DeleteRegistry(c *gin.Context) {
	var res Response
	var deleteVO DeleteVO
	if err := c.ShouldBindJSON(&deleteVO); err != nil {
		res.Code = http.StatusBadRequest
		res.Message = "fail to get params"
		c.JSON(http.StatusBadRequest, res)
		return
	}

	id := deleteVO.ID
	if err := db.Where("ID = ?", id).Delete(&RegistryPO{}).Error; err != nil {
		log.Printf("Delete registry error: %v", err)
		res.Code = http.StatusBadRequest
		res.Message = "fail to delete registry"
		c.JSON(http.StatusInternalServerError, res)
		return
	}
	res.Code = 0
	c.JSON(http.StatusOK, res)
}
