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

## TODOs
1. 接口配置抽象出公共配置，提升开发体验
2. 远程引入组件测试
3. 画布和Blank统一点击选择组件
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