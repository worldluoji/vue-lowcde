package utils

import (
	"fmt"
	"log"
	"time"

	"gorm.io/driver/mysql"
	"gorm.io/gorm"
)

func GetDB() *gorm.DB {
	dns := fmt.Sprintf(`%s:%s@tcp(%s)/%s?charset=utf8&parseTime=%t&loc=%s`,
		"root",
		"199114",
		"localhost:3308",
		"lowcode",
		true,
		"Local")
	db, err := gorm.Open(mysql.Open(dns), &gorm.Config{})
	if err != nil {
		log.Fatalf("1 failed to connect database: %v", err)
	}
	sqlDB, err := db.DB()
	if err != nil {
		log.Fatalf("2 failed to connect database: %v", err)
	}
	sqlDB.SetMaxIdleConns(2)  //空闲连接数
	sqlDB.SetMaxOpenConns(64) //最大连接数
	sqlDB.SetConnMaxLifetime(time.Minute)
	return db
}
