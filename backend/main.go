package main

import (
	"log"
	"net/http"
	"time"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"golang.org/x/sync/errgroup"

	app "backend/app"
	meta "backend/meta"
	page "backend/page"
	product "backend/product"
	user "backend/user"
)

// 路由
func router() http.Handler {
	router := gin.Default()

	router.Use(cors.New(cors.Config{
		AllowOrigins:     []string{"*"},
		AllowMethods:     []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"},
		AllowHeaders:     []string{"*"},
		ExposeHeaders:    []string{"Content-Length"},
		AllowCredentials: true,
		AllowOriginFunc: func(origin string) bool {
			return origin == "http://localhost"
		},
		MaxAge: 12 * time.Hour,
	}))

	productHandler := product.NewProductHandler()
	productHandler.InitProducts()
	userHandler := user.NewUserHandler()
	userHandler.InitUsers()

	appHander := app.NewAppHandler()
	pageHander := page.NewPageHandler()
	metaHander := meta.NewMetaHandler()

	// 路由分组、中间件、认证
	v1 := router.Group("/v1")
	{
		productv1 := v1.Group("/products")
		{
			// 路由匹配
			productv1.GET(":category", productHandler.GetByCateGory)
		}
		userv1 := v1.Group("/users")
		{
			userv1.GET("list", userHandler.GetUsers)
		}
		appv1 := v1.Group("/app")
		{
			appv1.GET("list", appHander.GetAppList)
			appv1.POST("create", appHander.CreateApp)
		}
		pagev1 := v1.Group("/page")
		{
			pagev1.GET("list", pageHander.GetPagesByAppId)
			pagev1.POST("create", pageHander.CreatePage)
		}
		metaV1 := v1.Group("/meta")
		{
			metaV1.GET("get", metaHander.GetMetaByPageId)
			metaV1.POST("save", metaHander.CreateOrUpdateMeta)
		}
	}

	return router
}

func main() {
	var eg errgroup.Group

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
