package user

import (
	"net/http"
	"sync"

	"github.com/gin-gonic/gin"
)

type User struct {
	Id      string `json:"id" binding:"required"`
	Name    string `json:"name" binding:"required"`
	Address string `json:"address" binding:"required"`
	Date    string `json:"date" binding:"required"`
}

type UserHandler struct {
	sync.RWMutex
	users []User
}

func NewUserHandler() *UserHandler {
	return &UserHandler{
		users: make([]User, 3),
	}
}

// 假数据
func (u *UserHandler) InitUsers() {
	user1 := User{Id: "1", Name: "Tom", Address: "No. 189, Grove St, Los Angeles", Date: "2016-05-16"}
	user2 := User{Id: "2", Name: "Jack", Address: "No. 189, Grove St, Los Angeles", Date: "2018-06-17"}
	user3 := User{Id: "3", Name: "John", Address: "No. 189, Grove St, Los Angeles", Date: "2020-07-18"}

	u.users[0] = user1
	u.users[1] = user2
	u.users[2] = user3
}

func (u *UserHandler) GetUsers(c *gin.Context) {
	u.Lock()
	defer u.Unlock()

	c.JSON(http.StatusOK, u.users)
}
