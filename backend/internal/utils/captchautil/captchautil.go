package captchautil

import (
	"errors"
	"log"
	"strings"

	captchaVO "backend/internal/model/captcha"

	"github.com/wenlng/go-captcha/captcha"
)

const (
	MIN_CAPTCHA_LEN   = 4
	CAPTCHA_RANGE_DET = 2
)

// 模拟保存验证码到缓存，暂不考虑超时时间
var cache map[string]string

func init() {
	cache = make(map[string]string)
}

func GenerateSimpleCaptcha(captchaLen int, imageWidth, imageHeight int) (*captchaVO.Captcha, error) {
	if captchaLen < MIN_CAPTCHA_LEN {
		return nil, errors.New("GenerateSimpleCaptcha: invalid input captchaLen")
	}
	if imageHeight < 0 {
		return nil, errors.New("GenerateSimpleCaptcha: invalid input imageHeight")
	}
	if imageWidth < 0 {
		return nil, errors.New("GenerateSimpleCaptcha: invalid input imageWidth")
	}

	// 创建一个验证码生成器
	capt := captcha.GetCaptcha()

	capt.SetRangCheckTextLen(captcha.RangeVal{
		Min: captchaLen,
		Max: captchaLen,
	})

	capt.SetTextRangLen(captcha.RangeVal{
		Min: captchaLen,
		Max: captchaLen,
	})

	// 设置验证码的宽度和高度
	capt.SetImageSize(captcha.Size{Width: imageHeight, Height: imageWidth})

	// 设置验证码的字符集合
	_ = capt.SetRangChars(strings.Split("ABCDEFGHIJKLMNPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz123456789", ""))

	var res = &captchaVO.Captcha{}
	// 生成验证码字符串
	dots, _, thumbImageBase64, key, err := capt.Generate()
	if err != nil {
		log.Println(err)
		return res, err
	}

	log.Println(dots)
	var checkCode = ""
	for i := 0; i < captchaLen; i++ {
		checkCode += dots[i].Text
	}
	cache[key] = checkCode

	// SimpleCaptcha只需要输入选中的字
	res.ImageBase64 = thumbImageBase64
	res.Key = key

	return res, nil
}

func CheckSimpleCaptcha(key, code string) bool {
	if v, ok := cache[key]; ok && v == code {
		return true
	}
	return false
}

func GenerateCaptcha(captchaLen int, imageWidth, imageHeight int) (*captchaVO.Captcha, error) {
	if captchaLen < MIN_CAPTCHA_LEN {
		return nil, errors.New("GenerateCaptcha: invalid input captchaLen")
	}

	if imageHeight < 0 {
		return nil, errors.New("GenerateCaptcha: invalid input imageHeight")
	}
	if imageWidth < 0 {
		return nil, errors.New("GenerateCaptcha: invalid input imageWidth")
	}

	// 创建一个验证码生成器
	capt := captcha.GetCaptcha()

	capt.SetRangCheckTextLen(captcha.RangeVal{
		Min: captchaLen,
		Max: captchaLen,
	})

	capt.SetTextRangLen(captcha.RangeVal{
		Min: captchaLen + CAPTCHA_RANGE_DET,
		Max: captchaLen + 2*CAPTCHA_RANGE_DET,
	})

	// 设置验证码的宽度和高度
	capt.SetImageSize(captcha.Size{Width: imageWidth, Height: imageHeight})

	var res = &captchaVO.Captcha{}
	// 生成验证码字符串
	dots, imageBase64, thumbImageBase64, key, err := capt.Generate()
	if err != nil {
		log.Println(err)
		return res, err
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

	return res, nil
}
