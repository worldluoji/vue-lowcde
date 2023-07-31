# runtime engine
引擎包，从后端获取元数据，渲染出页面

## build
打包为独立的引擎包：
```
pnpm build
```
打包为可以内嵌到platform的静态资源：
```
pnpm build:inner
```
当然，你可以通过修改打包命令中的--base参数内嵌到别的前端工程里：
https://cn.vitejs.dev/guide/build.html#public-base-path


## Tips
### 1. 独立部署如何改造
可以把相关配置放到 public目录下的config.json下，然后通过“请求”的方式获取。
比如网关地址要改等等。
```
const siteMeta = await get('./config.json');
 console.log('siteMeta', siteMeta);
if (!siteMeta) {
   throw new Error('config不能为空');
}

 获取appId
let appId = siteMeta.appId;
```

### 2. 如何实现真正的动态路由
```
const generateRoute = (to, name) => {
   return {
     name: name,
     path: to.path,
     component: () => import('../view/DynamicRender.vue'),
     props: { pageId: to.query.pageId }
   };
};

router.beforeEach((to) => {
    console.log(111, to.name, to.fullPath, to.path);
    console.log(router.getRoutes());
    let name = to.name;
    if (!name) {
        // 如果已经是'/'直接返回了
        if (to.path === '/') {
          return;
        }
        name = to.path.slice(1);
    }

    // 路由已经存在，直接走路由即可
    if (router.hasRoute(name)) {
        return;
    }

    // 路由不存在，就根据跳转的path动态添加路由
    router.addRoute(generateRoute(to, name));
    // 触发重定向
    return to.fullPath;
 });
 ```
 同时，权限也可以在beforeEach中进行控制。