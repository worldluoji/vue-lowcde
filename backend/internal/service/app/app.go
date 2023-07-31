package app

import (
	"log"
	"net/http"
	"time"

	"github.com/gin-gonic/gin"
	"gorm.io/gorm"

	"backend/internal/model/app"
	"backend/internal/model/response"
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

var db *gorm.DB

func init() {
	db = utils.GetDB()
	db.AutoMigrate(&AppPO{})
}

type Response response.Response

func (u *AppHandler) GetAppList(c *gin.Context) {
	var apps []AppPO
	var res Response
	if err := db.Find(&apps).Error; err != nil {
		log.Println("fail to get app list:", err)
		res.Code = 500
		res.Message = "fail to get app list "
		return
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

	res.Code = 0
	res.Data = u.apps
	c.JSON(http.StatusOK, res)
}

func (u *AppHandler) CreateApp(c *gin.Context) {
	var appVO AppVO
	var res Response
	// 通过c.ShouldBindJSON函数，将 Body 中的 JSON 格式数据解析到指定的 Struct 中
	if err := c.ShouldBindJSON(&appVO); err != nil {
		res.Code = 400
		res.Message = "fail to get params"
		// gin.H{"error": err.Error()}
		c.JSON(http.StatusBadRequest, res)
		return
	}

	app := &AppPO{}
	app.Name = appVO.Name
	app.Desc = appVO.Desc
	app.CreatedAt = time.Now()
	if err := db.Create(app).Error; err != nil {
		log.Printf("Create error: %v", err)
		res.Code = 400
		res.Message = "fail to create App"
		c.JSON(http.StatusInternalServerError, res)
		return
	}

	log.Printf("Create app %s success", app.Name)

	appVO.ID = app.ID
	res.Code = 0
	res.Data = appVO
	c.JSON(http.StatusOK, res)
}

func (u *AppHandler) DeleteApp(c *gin.Context) {
	var res Response
	id, ok := c.GetQuery("id")
	if !ok {
		res.Code = 400
		res.Message = "fail to get param id"
		c.JSON(http.StatusNotFound, res)
		return
	}
	if err := db.Where("id = ?", id).Delete(&AppPO{}).Error; err != nil {
		log.Printf("Delete app error: %v", err)
		res.Code = 400
		res.Message = "fail to delete app"
		c.JSON(http.StatusOK, res)
		return
	}

	res.Code = 0
	c.JSON(http.StatusOK, res)
}
