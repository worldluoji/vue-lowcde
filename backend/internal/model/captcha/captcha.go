package captcha

type Captcha struct {
	Key              string `json:"key"`
	ImageBase64      string `json:"imageBase64"`
	ThumbImageBase64 string `json:"thumbImageBase64"`
}
