package captchautil

import (
	"encoding/json"
	"errors"
	"fmt"
	"log"
	"strconv"
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
	bytes, _ := json.Marshal(dots)
	cache[key] = string(bytes)
	// thumbImageBase64 只包含要选中的字， imageBase64包含了干扰字和要选中的字
	// log.Println(thumbImageBase64)
	// log.Println(key)
	res.ImageBase64 = imageBase64
	res.Key = key
	res.ThumbImageBase64 = thumbImageBase64

	return res, nil
}

func CheckCaptcha(key, dots string) bool {
	cacheData, ok := cache[key]
	if !ok {
		return false
	}

	src := strings.Split(dots, ",")

	var dct map[int]captcha.CharDot
	if err := json.Unmarshal([]byte(cacheData), &dct); err != nil {
		return false
	}

	chkRet := false
	if (len(dct) * 2) == len(src) {
		for i, dot := range dct {
			j := i * 2
			k := i*2 + 1
			sx, _ := strconv.ParseFloat(fmt.Sprintf("%v", src[j]), 64)
			sy, _ := strconv.ParseFloat(fmt.Sprintf("%v", src[k]), 64)

			// 检测点位置
			// chkRet = captcha.CheckPointDist(int64(sx), int64(sy), int64(dot.Dx), int64(dot.Dy), int64(dot.Width), int64(dot.Height))

			// 校验点的位置,在原有的区域上添加额外边距进行扩张计算区域,不推荐设置过大的padding
			// 例如：文本的宽和高为30，校验范围x为10-40，y为15-45，此时扩充5像素后校验范围宽和高为40，则校验范围x为5-45，位置y为10-50
			chkRet = captcha.CheckPointDistWithPadding(int64(sx), int64(sy), int64(dot.Dx), int64(dot.Dy), int64(dot.Width), int64(dot.Height), 5)
			if !chkRet {
				break
			}
		}
	}

	if chkRet {
		// 通过校验
		return true
	}
	return false
}
