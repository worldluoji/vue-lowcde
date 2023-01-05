# Vue lowcode

# pre-end
## install
```
npm install --legacy-peer-deps
```

## start
平台启动
```
npm run dev
```

## build
平台打包
```
npm run build
```

## preview
平台打包后预览
```
npm run preview
```

## TODOS
1. 接口配置
2. 打包：
1）获取元数据信息，app路由信息，重新组织后进行打包
1) 根据元数据，转化为Vue页面，将Vue页面放入指定文件夹，并生成路由，再进行编译打包。
2. 远程引入卡片

# back-end
```
cd backend
go run main.go
```
这里，后端用来保存元数据，和给前端提供假数据。需要安装go和mariadb,并在3308端口启动mariadb.