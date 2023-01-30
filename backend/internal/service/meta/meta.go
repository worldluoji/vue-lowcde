package meta

import (
	"log"
	"net/http"
	"time"

	"github.com/gin-gonic/gin"
	"gorm.io/gorm"

	"backend/internal/model/meta"
	"backend/internal/utils"
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

var db *gorm.DB

func init() {
	db = utils.GetDB()
	db.AutoMigrate(&MetaPO{})
}

func (u *MetaHandler) GetMetaByPageId(c *gin.Context) {
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
