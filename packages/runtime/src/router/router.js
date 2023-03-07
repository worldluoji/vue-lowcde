import { getAppIdFromQueryParam } from '../utils/urlUtil';
const routes = [];

const router = VueRouter.createRouter({
  history: VueRouter.createWebHashHistory(),
  routes
});

async function get(url) {
  const res = await fetch(url, {
    method: 'GET'
  })
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error(response.statusText);
      }
    })
    .catch(() => {
      ElementPlus.ElMessageBox.alert('网络忙，请稍后再试', '提示', {});
    });
  return res;
}

const appId = getAppIdFromQueryParam('appId');
// console.log('appId', appId);
if (!appId) {
  throw new Error('appId为空');
}

const BASE_URL = `${import.meta.env.VITE_BASE_API_URL}`;
const routeRes = await get(`${BASE_URL}/v1/page/list?appId=${appId}`);
// console.log('routeRes', routeRes);

// 通过appId从后端获取路由。这里实际可以把所有路由都加载了，后续就不用再动态加，只用处理跳转登陆逻辑（权限控制）
if (routeRes && routeRes.length > 0) {
  for (let r of routeRes) {
    router.addRoute({
      path: r.path,
      name: r.name,
      component: () => import('../view/DynamicRender.vue'),
      props: { pageId: r.id + '', appId }
    });
  }

  // 默认第一个为根路由
  let r = routeRes[0];
  router.addRoute({
    path: '/',
    component: () => import('../view/DynamicRender.vue'),
    props: { pageId: r.id + '', appId }
  });
}

// console.log('router', router.getRoutes());
export default router;
