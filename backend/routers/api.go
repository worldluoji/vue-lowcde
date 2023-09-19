package routers

import (
	"backend/internal/service/app"
	"backend/internal/service/captcha"
	"backend/internal/service/meta"
	"backend/internal/service/modal"
	"backend/internal/service/page"
	"backend/internal/service/registry"
	"backend/internal/service/user"
	"time"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
)

// 路由
func GetApiRouter() *gin.Engine {
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

	userHandler := user.NewUserHandler()
	userHandler.InitUsers()

	appHandler := app.NewAppHandler()
	pageHandler := page.NewPageHandler()
	metaHander := meta.NewMetaHandler()
	registryHandler := registry.NewRegistryHandler()
	modalHandler := modal.NewModalHandler()

	// 路由分组、中间件、认证
	v1 := router.Group("/v1")
	{
		userv1 := v1.Group("/users")
		{
			userv1.GET("list", userHandler.GetUsers)
		}
		appv1 := v1.Group("/app")
		{
			appv1.GET("list", appHandler.GetAppList)
			appv1.POST("create", appHandler.CreateApp)
			appv1.DELETE("delete", appHandler.DeleteApp)
		}
		pagev1 := v1.Group("/page")
		{
			pagev1.GET("list", pageHandler.GetPagesByAppId)
			pagev1.POST("create", pageHandler.CreatePage)
			pagev1.DELETE("delete", pageHandler.DeletePage)
		}
		metaV1 := v1.Group("/meta")
		{
			metaV1.GET("get", metaHander.GetMetaByPageId)
			metaV1.POST("save", metaHander.CreateOrUpdateMeta)
		}
		registryV1 := v1.Group("/registry")
		{
			registryV1.GET("list", registryHandler.GetRegistriesByAppId)
			registryV1.POST("create", registryHandler.CreateRegistry)
			registryV1.DELETE("delete", registryHandler.DeleteRegistry)
		}
		modalV1 := v1.Group("/modal")
		{
			modalV1.GET("list", modalHandler.GetModalByPageId)
			modalV1.POST("create", modalHandler.CreateModal)
			modalV1.DELETE("delete", modalHandler.DeleteModal)
		}
		captchaV1 := v1.Group("/captcha")
		{
			captchaV1.GET("", captcha.GetCaptcha)
		}
	}

	return router
}
