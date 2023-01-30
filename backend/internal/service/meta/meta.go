package meta

import (
	"fmt"
	"log"
	"net/http"
	"time"

	"github.com/gin-gonic/gin"
	"gorm.io/driver/mysql"
	"gorm.io/gorm"

	"backend/internal/model/meta"
)

type MetaVO meta.MetaVO

type MetaPO meta.MetaPO

// TableName maps to mysql table name.
func (p *MetaPO) TableName() string {
	return "meta"
}

type MetaHandler struct {
	meta MetaVO
}

func NewMetaHandler() *MetaHandler {
	return &MetaHandler{
		meta: MetaVO{},
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

func (u *MetaHandler) GetMetaByPageId(c *gin.Context) {
	db := GetDB()
	db.AutoMigrate(&MetaPO{})

	pageId, ok := c.GetQuery("pageId")
	if !ok {
		c.JSON(http.StatusBadRequest, gin.H{"error": "fail to get pageId"})
		return
	}

	var meta MetaPO
	if err := db.Where("pageId = ?", pageId).First(&meta).Error; err != nil {
		log.Printf("Get meta error: %v", err)
		c.JSON(http.StatusOK, MetaVO{Content: ""})
		return
	}
	u.meta.ID = meta.ID
	u.meta.Content = meta.Content
	u.meta.PageID = meta.PageID

	c.JSON(http.StatusOK, u.meta)
}

func (u *MetaHandler) CreateOrUpdateMeta(c *gin.Context) {
	var metaVO MetaVO
	if err := c.ShouldBindJSON(&metaVO); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	db := GetDB()

	meta := &MetaPO{}
	meta.Content = metaVO.Content
	meta.PageID = metaVO.PageID
	meta.CreatedAt = time.Now()
	if metaVO.ID > 0 {
		meta.ID = metaVO.ID
		if err := db.Save(meta).Error; err != nil {
			log.Printf("Update metadata error: %v", err)
			c.JSON(http.StatusInternalServerError, &MetaVO{})
			return
		}
	} else {
		if err := db.Create(meta).Error; err != nil {
			log.Printf("Create error: %v", err)
			c.JSON(http.StatusInternalServerError, &MetaVO{})
			return
		}
		metaVO.ID = meta.ID
	}

	log.Printf("Update page %d success", meta.PageID)

	c.JSON(http.StatusOK, metaVO)
}
