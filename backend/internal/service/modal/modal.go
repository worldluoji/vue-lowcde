package modal

import (
	"log"
	"net/http"
	"time"

	"github.com/gin-gonic/gin"
	"gorm.io/gorm"

	"backend/internal/model/modal"
	"backend/internal/model/response"
	"backend/internal/utils"
)

type ModalVO modal.ModalVO

type ModalPO modal.ModalPO

// TableName maps to mysql table name.
func (p *ModalPO) TableName() string {
	return "modal"
}

type ModalHandler struct {
	modals []ModalVO
}

func NewModalHandler() *ModalHandler {
	return &ModalHandler{
		modals: nil,
	}
}

var db *gorm.DB

func init() {
	db = utils.GetDB()
	db.AutoMigrate(&ModalPO{})
}

type Response response.Response

func (u *ModalHandler) GetModalByPageId(c *gin.Context) {
	var modals []ModalPO
	var res Response
	pageId, ok := c.GetQuery("pageId")
	if !ok {
		res.Code = 400
		res.Message = "fail to get pageId"
		c.JSON(http.StatusBadRequest, res)
		return
	}
	if err := db.Where("pageId = ?", pageId).Find(&modals).Error; err != nil {
		log.Println("fail to get modal list:", err)
		res.Code = 500
		res.Message = "fail to get modal list "
		return
	}
	n := len(modals)
	u.modals = make([]ModalVO, n)
	for i := 0; i < n; i++ {
		u.modals[i] = ModalVO{
			ID:     modals[i].ID,
			Type:   modals[i].Type,
			Name:   modals[i].Name,
			Desc:   modals[i].Desc,
			PageID: modals[i].PageID,
		}
	}

	res.Code = 0
	res.Data = u.modals
	c.JSON(http.StatusOK, res)
}

func (u *ModalHandler) CreateModal(c *gin.Context) {
	var modalVO ModalVO
	var res Response
	// 通过c.ShouldBindJSON函数，将 Body 中的 JSON 格式数据解析到指定的 Struct 中
	if err := c.ShouldBindJSON(&modalVO); err != nil {
		res.Code = 400
		res.Message = "fail to get params"
		// gin.H{"error": err.Error()}
		c.JSON(http.StatusBadRequest, res)
		return
	}

	modal := &ModalPO{}
	modal.Name = modalVO.Name
	modal.Desc = modalVO.Desc
	modal.Type = modalVO.Type
	modal.Content = modalVO.Content
	modal.PageID = modalVO.PageID
	modal.CreatedAt = time.Now()
	if err := db.Create(modal).Error; err != nil {
		log.Printf("Create error: %v", err)
		res.Code = 400
		res.Message = "fail to create Modal"
		c.JSON(http.StatusInternalServerError, res)
		return
	}

	log.Printf("Create modal %s success", modal.Name)

	modalVO.ID = modal.ID
	res.Code = 0
	res.Data = modalVO
	c.JSON(http.StatusOK, res)
}

func (u *ModalHandler) DeleteModal(c *gin.Context) {
	var res Response
	id, ok := c.GetQuery("id")
	if !ok {
		res.Code = http.StatusBadRequest
		res.Message = "fail to get param id"
		c.JSON(http.StatusNotFound, res)
		return
	}
	if err := db.Where("id = ?", id).Delete(&ModalPO{}).Error; err != nil {
		log.Printf("Delete modal error: %v", err)
		res.Code = http.StatusBadRequest
		res.Message = "fail to delete modal"
		c.JSON(http.StatusOK, res)
		return
	}

	res.Code = 0
	c.JSON(http.StatusOK, res)
}
