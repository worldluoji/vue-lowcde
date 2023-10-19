package captcha

// go get -u github.com/wenlng/go-captcha/captcha
import (
	"net/http"

	captchaModel "backend/internal/model/captcha"
	"backend/internal/model/response"

	captchaUtil "backend/internal/utils/captchautil"

	"github.com/gin-gonic/gin"
)

type Response response.Response

func GetSimpleCaptcha(c *gin.Context) {
	var res Response
	if captchaInfo, err := captchaUtil.GenerateSimpleCaptcha(4, 150, 40); err != nil {
		res.Code = 0
		res.Data = captchaInfo
		c.JSON(http.StatusOK, res)
	} else {
		res.Code = 1
		res.Message = "fail to get captcha"
		c.JSON(http.StatusInternalServerError, res)
	}
}

func CheckSimpleCaptcha(c *gin.Context) {
	var checkVO captchaModel.SimpleCaptchaCheckVO
	var res Response
	if err := c.ShouldBindJSON(&checkVO); err != nil {
		res.Code = 1
		res.Message = "fail to process request params"
		// gin.H{"error": err.Error()}
		c.JSON(http.StatusBadRequest, res)
		return
	}
	if ok := captchaUtil.CheckSimpleCaptcha(checkVO.Key, checkVO.CheckCode); ok {
		res.Data = true
	} else {
		res.Data = false
	}
	res.Code = 0
	c.JSON(http.StatusOK, res)
}

func GetCaptcha(c *gin.Context) {
	var res Response
	if captchaInfo, err := captchaUtil.GenerateCaptcha(4, 150, 40); err != nil {
		res.Code = 0
		res.Data = captchaInfo
		c.JSON(http.StatusOK, res)
	} else {
		res.Code = 1
		res.Message = "fail to get captcha"
		c.JSON(http.StatusInternalServerError, res)
	}
}
