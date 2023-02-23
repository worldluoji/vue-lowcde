import { getQueryString } from '../utils/urlUtil';
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
// const siteMeta = await get('./config.json');
// // console.log('siteMeta', siteMeta);
// if (!siteMeta) {
//   throw new Error('config不能为空');
// }

// 获取appId
// let appId = siteMeta.appId;
const appId = getQueryString('appId');
// console.log('appId', appId);
if (!appId) {
  throw new Error('appId为空');
}

const BASE_URL = `${import.meta.env.VITE_BASE_API_URL}`;
const routeRes = await get(`${BASE_URL}/v1/page/list?appId=${appId}`);
console.log('routeRes', routeRes);

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

// const generateRoute = (to, name) => {
//   return {
//     name: name,
//     path: to.path,
//     component: () => import('../view/DynamicRender.vue'),
//     props: { pageId: to.query.pageId }
//   };
// };

// router.beforeEach((to) => {
//   // console.log(111, to.name, to.fullPath, to.path);
//   // console.log(router.getRoutes());
//   let name = to.name;
//   if (!name) {
//     // 如果已经是'/'直接返回了
//     if (to.path === '/') {
//       return;
//     }
//     name = to.path.slice(1);
//   }

//   // 路由已经存在，直接走路由即可
//   if (router.hasRoute(name)) {
//     return;
//   }

//   // console.log(222, to.name, to.fullPath, to.path);
//   // 路由不存在，就根据跳转的path动态添加路由
//   router.addRoute(generateRoute(to, name));
//   // 触发重定向
//   return to.fullPath;
// });

export default router;
