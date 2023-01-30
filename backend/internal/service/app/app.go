package app

import (
	"fmt"
	"log"
	"net/http"
	"time"

	"github.com/gin-gonic/gin"

	"backend/internal/model/app"
	"backend/internal/utils"
)

type AppVO app.AppVO

type AppPO app.AppPO

// TableName maps to mysql table name.
func (p *AppPO) TableName() string {
	return "app"
}

type AppHandler struct {
	apps []AppVO
}

func NewAppHandler() *AppHandler {
	return &AppHandler{
		apps: nil,
	}
}

func (u *AppHandler) GetAppList(c *gin.Context) {
	db := utils.GetDB()
	db.AutoMigrate(&AppPO{})
	var apps []AppPO
	if err := db.Find(&apps).Error; err != nil {
		log.Fatalf("Get product error: %v", err)
	}
	n := len(apps)
	u.apps = make([]AppVO, n)
	for i := 0; i < n; i++ {
		u.apps[i] = AppVO{
			ID:   apps[i].ID,
			Name: apps[i].Name,
			Desc: apps[i].Desc,
		}
	}

	c.JSON(http.StatusOK, u.apps)
}

func (u *AppHandler) CreateApp(c *gin.Context) {
	var appVO AppVO
	// 通过c.ShouldBindJSON函数，将 Body 中的 JSON 格式数据解析到指定的 Struct 中
	if err := c.ShouldBindJSON(&appVO); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	db := utils.GetDB()

	app := &AppPO{}
	app.Name = appVO.Name
	app.Desc = appVO.Desc
	app.CreatedAt = time.Now()
	if err := db.Create(app).Error; err != nil {
		log.Printf("Create error: %v", err)
		c.JSON(http.StatusInternalServerError, appVO)
		return
	}

	log.Printf("Create app %s success", app.Name)

	appVO.ID = app.ID
	c.JSON(http.StatusOK, appVO)
}

func (u *AppHandler) DeleteApp(c *gin.Context) {
	id, ok := c.GetQuery("id")
	if !ok {
		c.JSON(http.StatusNotFound, gin.H{"error": fmt.Errorf("failed to get param")})
		return
	}
	db := utils.GetDB()
	if err := db.Where("id = ?", id).Delete(&AppPO{}).Error; err != nil {
		log.Printf("Delete app error: %v", err)
		c.JSON(http.StatusOK, "failed")
		return
	}
	c.JSON(http.StatusOK, "success")
}
