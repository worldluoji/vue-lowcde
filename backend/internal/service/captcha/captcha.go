package captcha

// go get -u github.com/wenlng/go-captcha/captcha
import (
	"log"
	"net/http"

	captchaVO "backend/internal/model/captcha"
	"backend/internal/model/response"

	"github.com/gin-gonic/gin"
	"github.com/wenlng/go-captcha/captcha"
)

func GenerateCaptcha() *captchaVO.Captcha {
	// 创建一个验证码生成器
	capt := captcha.GetCaptcha()

	capt.SetRangCheckTextLen(captcha.RangeVal{
		Min: 4,
		Max: 4,
	})

	capt.SetTextRangLen(captcha.RangeVal{
		Min: 6,
		Max: 8,
	})

	// 设置验证码的宽度和高度
	// capt.SetImageSize(captcha.Size{Width: 150, Height: 40})

	// 设置验证码的字符集合
	// _ = capt.SetRangChars(strings.Split("ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789", ""))

	var res = &captchaVO.Captcha{}
	// 生成验证码字符串
	dots, imageBase64, thumbImageBase64, key, err := capt.Generate()
	if err != nil {
		log.Println(err)
		return res
	}

	// 将验证码字符串保存到Session或数据库中，以便后续验证
	// 这里只是简单地将验证码字符串打印到控制台，仅用于演示目的
	// log.Println("Generated captcha:", imageBase64)
	log.Println(dots)
	// thumbImageBase64 只包含要选中的字， imageBase64包含了干扰字和要选中的字
	// log.Println(thumbImageBase64)
	// log.Println(key)
	res.ImageBase64 = imageBase64
	res.Key = key
	res.ThumbImageBase64 = thumbImageBase64

	return res
}

type Response response.Response

func GetCaptcha(c *gin.Context) {
	var res Response
	captchaInfo := GenerateCaptcha()
	if captchaInfo.Key != "" {
		res.Code = 0
		res.Data = captchaInfo
		c.JSON(http.StatusOK, res)
	} else {
		res.Code = 1
		res.Message = "fail to get captcha"
		c.JSON(http.StatusInternalServerError, res)
	}
}
