# Vue lowcode

# pre-end
## install
```
yarn
```

## start
```
yarn dev
```

## TODOS
1. 接口配置
2. 打包：
1）新建app(得到appId) -> 新建页面(得到pageId, 同时配置页面路由保存)，保存时，同元数据一起，保存到后端
2）获取元数据信息，app路由信息，重新组织后进行打包
3) 如何组织？利用learna，打包单独工程，保证平台和打包工程相同的依赖；根据元数据，转化为Vue页面，将Vue页面放入指定文件；将生成的Vue文件生成路由；yarn build进行编译打包。
3. 远程引入卡片

# back-end
```
cd backend
go run main.go
```
这里，后端目前仅用来给前端提供假数据