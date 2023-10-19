package captcha

import (
	cap "backend/internal/utils/captchautil"
	"testing"

	. "github.com/go-playground/assert/v2"
)

func TestGenerateSimpleCaptcha(t *testing.T) {
	_, err := cap.GenerateSimpleCaptcha(4, 60, 60)
	Equal(t, err, nil)
}
