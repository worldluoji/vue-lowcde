# Vue lowcode

# pre-end
## install
```
pnpm install
```

## start
平台启动
```
pnpm dev
```

## build
平台打包
```
pnpm build
```

## preview
平台打包后预览
```
pnpm preview
```

## 打包自定义组件
```
pnpm build:comp
```
打包后的组件在packages/customer/dist目录下

## 打包引擎包
```
pnpm build:engine
```

## TODOs
1. 完善远程引入组件
2. 优化容器选择组件的方式（现在是下拉列表，需优化）
3. 弹窗公共配置（1. 组件里直接写弹窗 2. 组件留口子，平台配置弹窗，提供相关属性配置，并通过router-view路由到弹窗页）
4. 接口配置抽象出公共配置
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


# 其它说明
1. 全局引入的包如下，也就是public/static目录下的文件是从这里下载的，内网没有cdn，就先下载下来了。
```
<script src="https://cdn.jsdelivr.net/npm/vue@3.2.45/dist/vue.global.prod.js"></script>
<script src="https://cdn.jsdelivr.net/npm/vue-router@4.1.6/dist/vue-router.global.prod.js"></script>
<script src="https://cdn.bootcdn.net/ajax/libs/vue-demi/0.13.11/index.iife.js"></script>
<script src="https://cdn.jsdelivr.net/npm/pinia@2.0.27/dist/pinia.iife.min.js"></script>
<script src="
    https://cdn.jsdelivr.net/npm/element-plus@2.2.30/dist/index.full.min.js
"></script>
<link href="
    https://cdn.jsdelivr.net/npm/element-plus@2.2.30/dist/index.min.css
" rel="stylesheet">
<script src="
    https://cdn.jsdelivr.net/npm/vant@4.0.11/lib/vant.min.js
"></script>
<link href="
    https://cdn.jsdelivr.net/npm/vant@4.0.11/lib/index.min.css
" rel="stylesheet">
https://unpkg.com/rxjs@7.8.0/dist/bundles/rxjs.umd.min.js
```

2. 如何使用运行时预览的功能
对于本地，先 pnpm build:engine 打包引擎包, 进入dist目录，然后
```
http-server -p 8988
```
对于生产环境，修改 .env.production 中的 VITE_RUNTIME_URL 指向引擎实际的URL地址。