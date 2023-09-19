package captcha

// go get -u github.com/wenlng/go-captcha/captcha
import (
	"log"
	"net/http"

	"backend/internal/model/response"

	"github.com/gin-gonic/gin"
	"github.com/wenlng/go-captcha/captcha"
)

func GenerateCaptcha() string {
	// 创建一个验证码生成器
	capt := captcha.GetCaptcha()

	// 设置验证码的宽度和高度
	// capt.SetImageSize(captcha.Size{Width: 150, Height: 40})

	// 设置验证码的字符集合
	// _ = capt.SetRangChars(strings.Split("ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789", ""))

	// 生成验证码字符串
	// dots, imageBase64, thumbImageBase64, key, err := capt.Generate()
	dots, imageBase64, _, key, err := capt.Generate()
	if err != nil {
		log.Println(err)
		return ""
	}

	// 将验证码字符串保存到Session或数据库中，以便后续验证
	// 这里只是简单地将验证码字符串打印到控制台，仅用于演示目的
	// log.Println("Generated captcha:", imageBase64)
	log.Println(dots)
	// log.Println(thumbImageBase64)
	log.Println(key)

	// 将生成的验证码图像写入HTTP响应中
	// w.Header().Set("Content-Type", "image/png")
	// captcha.WriteImage(w)
	return imageBase64
}

type Response response.Response

func GetCaptcha(c *gin.Context) {
	var res Response
	imageBase64 := GenerateCaptcha()
	res.Code = 0
	res.Data = imageBase64
	c.JSON(http.StatusOK, res)
}
