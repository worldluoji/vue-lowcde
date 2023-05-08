package meta

import (
	"log"
	"net/http"
	"time"

	"github.com/gin-gonic/gin"
	"gorm.io/gorm"

	"backend/internal/model/meta"
	"backend/internal/model/response"
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

type Response response.Response

func (u *MetaHandler) GetMetaByPageId(c *gin.Context) {
	var res Response
	pageId, ok := c.GetQuery("pageId")
	if !ok {
		res.Code = http.StatusBadRequest
		res.Message = "fail to get pageId"
		c.JSON(http.StatusBadRequest, res)
		return
	}

	var meta MetaPO
	if err := db.Where("pageId = ?", pageId).First(&meta).Error; err != nil {
		log.Printf("Get meta error: %v", err)
		res.Code = http.StatusInternalServerError
		res.Message = "fail to get meta data"
		c.JSON(http.StatusInternalServerError, res)
		return
	}
	u.meta.ID = meta.ID
	u.meta.Content = meta.Content
	u.meta.PageID = meta.PageID

	res.Code = 0
	res.Data = u.meta
	c.JSON(http.StatusOK, res)
}

func (u *MetaHandler) CreateOrUpdateMeta(c *gin.Context) {
	var res Response
	var metaVO MetaVO
	if err := c.ShouldBindJSON(&metaVO); err != nil {
		log.Printf("get params error: %v", err)
		res.Code = http.StatusBadRequest
		res.Message = "fail to get params"
		c.JSON(http.StatusBadRequest, res)
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
			res.Code = http.StatusInternalServerError
			res.Message = "Update metadata error"
			c.JSON(http.StatusInternalServerError, res)
			return
		}
	} else {
		if err := db.Create(meta).Error; err != nil {
			log.Printf("Create error: %v", err)
			res.Code = http.StatusInternalServerError
			res.Message = "Create meata data error"
			c.JSON(http.StatusInternalServerError, res)
			return
		}
		metaVO.ID = meta.ID
	}

	log.Printf("Update page %d success", meta.PageID)
	res.Code = 0
	res.Data = metaVO
	c.JSON(http.StatusOK, res)
}
