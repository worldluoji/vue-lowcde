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


# 问题
```
FATAL ERROR: Ineffective mark-compacts near heap limit Allocation failed - JavaScript heap out of memory
```
解决方案：
```
export NODE_OPTIONS="--max-old-space-size=4096"
```
linux可写入到.bashrc, Mac在~目录下有.bash_profile和.zprofile可配置。一般在这个文件中添加用户级环境变量，在登陆时执行一次。
～/.bash_profile生效的前提是我们需要使用bash作为终端，随着系统的升级MAC会将默认终端切换为zsh，
如果我们稍不注意按照提示进行了修改，那么就会导致～/.bash_profile无效