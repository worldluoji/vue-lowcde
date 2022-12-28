package page

import (
	"fmt"
	"log"
	"net/http"
	"time"

	"github.com/gin-gonic/gin"
	"gorm.io/driver/mysql"
	"gorm.io/gorm"
)

type PageVO struct {
	ID     uint   `json:"id"`
	Name   string `json:"name" binding:"required"`
	Path   string `json:"path" binding:"required"`
	Desc   string `json:"desc"`
	PageID uint   `json:"pageId"`
}

type PagePO struct {
	gorm.Model
	Name   string `gorm:"column:name"`
	Path   string `gorm:"column:path"`
	Desc   string `gorm:"column:desc"`
	PageID uint   `gorm:"column:pageId"`
}

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

func GetDB() *gorm.DB {
	dns := fmt.Sprintf(`%s:%s@tcp(%s)/%s?charset=utf8&parseTime=%t&loc=%s`,
		"root",
		"199114",
		"localhost:3308",
		"lowcode",
		true,
		"Local")
	db, err := gorm.Open(mysql.Open(dns), &gorm.Config{})
	if err != nil {
		log.Fatalf("failed to connect database: %v", err)
	}
	return db
}

func (u *PageHandler) GetPagesByAppId(c *gin.Context) {
	db := GetDB()
	db.AutoMigrate(&PagePO{})

	pageId, ok := c.GetQuery("pageId")
	if !ok {
		c.JSON(http.StatusBadRequest, gin.H{"error": "fail to get page id"})
		return
	}

	var pages []PagePO
	if err := db.Where("pageId = ?", pageId).Find(&pages).Error; err != nil {
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

	db := GetDB()

	page := &PagePO{}
	page.Name = pageVO.Name
	page.Path = pageVO.Path
	page.Desc = pageVO.Desc
	page.PageID = pageVO.PageID
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
	db := GetDB()
	if err := db.Where("id = ?", id).Delete(&PagePO{}).Error; err != nil {
		log.Printf("Delete page error: %v", err)
		c.JSON(http.StatusOK, "failed")
		return
	}
	c.JSON(http.StatusOK, "success")
}
