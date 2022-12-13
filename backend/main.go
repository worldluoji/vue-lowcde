package main

import (
	"fmt"
	"log"
	"net/http"
	"sync"
	"time"

	"github.com/gin-gonic/gin"
	"golang.org/x/sync/errgroup"
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

type productHandler struct {
	sync.RWMutex
	products []Product
}

func newProductHandler() *productHandler {
	return &productHandler{
		products: make([]Product, 6),
	}
}

// 假数据
func (u *productHandler) initProducts() {
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

func (u *productHandler) GetByCateGory(c *gin.Context) {
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

// 路由
func router() http.Handler {
	router := gin.Default()
	productHandler := newProductHandler()
	productHandler.initProducts()

	// 路由分组、中间件、认证
	v1 := router.Group("/v1")
	{
		productv1 := v1.Group("/products")
		{
			// 路由匹配
			productv1.GET(":category", productHandler.GetByCateGory)
		}
	}

	return router
}

func main() {
	var eg errgroup.Group

	// 一进程多端口
	server := &http.Server{
		Addr:         ":8098",
		Handler:      router(),
		ReadTimeout:  5 * time.Second,
		WriteTimeout: 10 * time.Second,
	}

	eg.Go(func() error {
		err := server.ListenAndServe()
		if err != nil && err != http.ErrServerClosed {
			log.Fatal(err)
		}
		return err
	})

	if err := eg.Wait(); err != nil {
		log.Fatal(err)
	}
}
