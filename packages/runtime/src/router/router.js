import { getAppId, getAppName } from '../utils/urlUtil';
import { request } from '@lowcode/helper';
const routes = [];

const router = VueRouter.createRouter({
  history: VueRouter.createWebHashHistory(),
  routes
});

const appId = getAppId();
// console.log('appId', appId);
if (!appId) {
  throw new Error('appId为空');
}

const BASE_URL = `${import.meta.env.VITE_BASE_API_URL}`;
const routeRes = await request.get(`/v1/page/list?appId=${appId}`, BASE_URL);
console.log('routeRes', routeRes);

// 通过appId从后端获取路由。这里实际可以把所有路由都加载了，后续就不用再动态加，只用处理跳转登陆逻辑（权限控制）
if (routeRes && routeRes.code == 0 && routeRes.data && routeRes.data.length) {
  for (let r of routeRes.data) {
    router.addRoute({
      path: r.path,
      name: r.name,
      component: () => import('../view/DynamicRender.vue'),
      props: { pageId: r.id + '', appId }
    });
  }

  // 默认第一个为根路由
  let r = routeRes.data[0];
  router.addRoute({
    path: '/',
    component: () => import('../view/DynamicRender.vue'),
    props: { pageId: r.id + '', appId }
  });
}

const title = getAppName();
// console.log(222, title);
if (title) {
  document.title = title;
}

// console.log('router', router.getRoutes());
export default router;
