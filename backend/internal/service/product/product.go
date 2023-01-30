package product

import (
	"fmt"
	"net/http"
	"sync"

	"github.com/gin-gonic/gin"
)

type Product struct {
	Id       string  `json:"id" binding:"required"`
	Title    string  `json:"title" binding:"required"`
	Price    float64 `json:"price" binding:"gte=0"`
	Num      int     `json:"num" binding:"gte=0"`
	Desc     string  `json:"desc"`
	Pic      string  `json:"pic"`
	Category string  `json:"category" binding:"required"`
}

type ProductHandler struct {
	sync.RWMutex
	products []Product
}

func NewProductHandler() *ProductHandler {
	return &ProductHandler{
		products: make([]Product, 6),
	}
}

// 假数据
func (u *ProductHandler) InitProducts() {
	pad1 := Product{Id: "1", Title: "MatePad 10 Pro", Desc: "New MatePad Pro 10.8", Price: 2699.00, Num: 3, Pic: "https://tse4-mm.cn.bing.net/th/id/OIP-C.Yc1Bz6kwzPTW7MlSMdQMxQHaEK?pid=ImgDet&rs=1", Category: "pad"}
	pad2 := Product{Id: "2", Title: "IPAD 2022", Desc: "New IPAD 2022 10.8", Price: 2899.00, Num: 1, Pic: "https://fastly.jsdelivr.net/npm/@vant/assets/ipad.jpeg", Category: "pad"}
	pad3 := Product{Id: "3", Title: "MatePad 11 Pro", Desc: "New MatePad Pro 11", Price: 3599.00, Num: 3, Pic: "https://tse4-mm.cn.bing.net/th/id/OIP-C.Yc1Bz6kwzPTW7MlSMdQMxQHaEK?pid=ImgDet&rs=1", Category: "pad"}
	pad4 := Product{Id: "4", Title: "IPAD PRO 2022", Desc: "New IPAD Pro 2022", Price: 4899.00, Num: 1, Pic: "https://fastly.jsdelivr.net/npm/@vant/assets/ipad.jpeg", Category: "pad"}

	phone1 := Product{Id: "5", Title: "Mate50", Desc: "Mate 50 2022", Price: 4899.00, Num: 1, Pic: "https://tse4-mm.cn.bing.net/th/id/OIP-C.Yc1Bz6kwzPTW7MlSMdQMxQHaEK?pid=ImgDet&rs=1", Category: "phone"}
	phone2 := Product{Id: "6", Title: "IPhone 14", Desc: "New IPhone 2022", Price: 4899.00, Num: 1, Pic: "https://fastly.jsdelivr.net/npm/@vant/assets/ipad.jpeg", Category: "phone"}

	u.products[0] = pad1
	u.products[1] = pad2
	u.products[2] = pad3
	u.products[3] = pad4
	u.products[4] = phone1
	u.products[5] = phone2
}

func (u *ProductHandler) GetByCateGory(c *gin.Context) {
	u.Lock()
	defer u.Unlock()

	// c.Param获取路径参数
	category := c.Param("category")

	if category == "" {
		c.JSON(http.StatusNotFound, gin.H{"error": fmt.Errorf("can not found product category %s", c.Param("category"))})
		return
	}

	var res = make([]Product, 0)
	for _, p := range u.products {
		if p.Category == category {
			res = append(res, p)
		}
	}

	c.JSON(http.StatusOK, res)
}
