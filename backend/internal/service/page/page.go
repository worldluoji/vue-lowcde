package page

import (
	"log"
	"net/http"
	"time"

	"github.com/gin-gonic/gin"
	"gorm.io/gorm"

	"backend/internal/model/page"
	"backend/internal/model/response"
	"backend/internal/utils"
)

type PageVO page.PageVO

type PagePO page.PagePO

// TableName maps to mysql table name.
func (p *PagePO) TableName() string {
	return "page"
}

type PageHandler struct {
	pages []PageVO
}

func NewPageHandler() *PageHandler {
	return &PageHandler{
		pages: nil,
	}
}

var db *gorm.DB

func init() {
	db = utils.GetDB()
	db.AutoMigrate(&PagePO{})
}

type Response response.Response

func (u *PageHandler) GetPagesByAppId(c *gin.Context) {
	var res Response
	appId, ok := c.GetQuery("appId")
	if !ok {
		res.Code = 400
		res.Message = "fail to get appId"
		c.JSON(http.StatusBadRequest, res)
		return
	}

	var pages []PagePO
	if err := db.Where("appId = ?", appId).Find(&pages).Error; err != nil {
		res.Code = 400
		res.Message = "Get page list error"
		c.JSON(http.StatusBadRequest, res)
		return
	}
	n := len(pages)
	u.pages = make([]PageVO, n)
	for i := 0; i < n; i++ {
		u.pages[i] = PageVO{
			ID:   pages[i].ID,
			Name: pages[i].Name,
			Path: pages[i].Path,
			Desc: pages[i].Desc,
		}
	}

	res.Code = 0
	res.Data = u.pages
	c.JSON(http.StatusOK, res)
}

func (u *PageHandler) CreatePage(c *gin.Context) {
	var res Response
	var pageVO PageVO
	if err := c.ShouldBindJSON(&pageVO); err != nil {
		res.Code = 400
		res.Message = "Fail to get params"
		c.JSON(http.StatusBadRequest, res)
		return
	}

	page := &PagePO{}
	page.Name = pageVO.Name
	page.Path = pageVO.Path
	page.Desc = pageVO.Desc
	page.AppID = pageVO.AppID
	page.CreatedAt = time.Now()
	if err := db.Create(page).Error; err != nil {
		log.Printf("Create error: %v", err)
		res.Code = 400
		res.Message = "Fail to create Page"
		c.JSON(http.StatusInternalServerError, res)
		return
	}

	log.Printf("Create app %s success", page.Name)

	pageVO.ID = page.ID
	res.Code = 0
	res.Data = pageVO
	c.JSON(http.StatusOK, res)
}

func (u *PageHandler) DeletePage(c *gin.Context) {
	var res Response
	res.Code = 0
	id, ok := c.GetQuery("id")
	if !ok {
		res.Code = 400
		res.Message = "Fail to get Id"
		c.JSON(http.StatusNotFound, res)
		return
	}
	if err := db.Where("id = ?", id).Delete(&PagePO{}).Error; err != nil {
		log.Printf("Delete page error: %v", err)
		res.Code = 500
		res.Message = "Fail to delete page"
		c.JSON(http.StatusOK, res)
		return
	}
	c.JSON(http.StatusOK, res)
}
