package page

import (
	"fmt"
	"log"
	"net/http"
	"time"

	"github.com/gin-gonic/gin"
	"gorm.io/gorm"

	"backend/internal/model/page"
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

func (u *PageHandler) GetPagesByAppId(c *gin.Context) {
	appId, ok := c.GetQuery("appId")
	if !ok {
		c.JSON(http.StatusBadRequest, gin.H{"error": "fail to get appId"})
		return
	}

	var pages []PagePO
	if err := db.Where("appId = ?", appId).Find(&pages).Error; err != nil {
		log.Fatalf("Get product error: %v", err)
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

	c.JSON(http.StatusOK, u.pages)
}

func (u *PageHandler) CreatePage(c *gin.Context) {
	var pageVO PageVO
	if err := c.ShouldBindJSON(&pageVO); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
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
		c.JSON(http.StatusInternalServerError, pageVO)
		return
	}

	log.Printf("Create app %s success", page.Name)

	pageVO.ID = page.ID
	c.JSON(http.StatusOK, pageVO)
}

func (u *PageHandler) DeletePage(c *gin.Context) {
	id, ok := c.GetQuery("id")
	if !ok {
		c.JSON(http.StatusNotFound, gin.H{"error": fmt.Errorf("failed to get param")})
		return
	}
	if err := db.Where("id = ?", id).Delete(&PagePO{}).Error; err != nil {
		log.Printf("Delete page error: %v", err)
		c.JSON(http.StatusOK, "failed")
		return
	}
	c.JSON(http.StatusOK, "success")
}
