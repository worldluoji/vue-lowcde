import { createRouter, createWebHashHistory } from 'vue-router';

const routes = [];

const router = createRouter({
  history: createWebHashHistory(),
  routes
});

// 模拟从后端加载首页数据, 实际应该通过appId从后端获取。这里实际可以把所有路由都加载了，后续就不用再动态加，只用处理跳转登陆逻辑（权限控制）
const getHost = async () => {
  return new Promise((reslove) => {
    reslove({ path: '/', name: 'home', pageId: 3 });
  });
};

const host = await getHost();
// console.log(111, host);
if (host) {
  router.addRoute({
    path: host.path,
    name: host.name,
    component: () => import('../view/DynamicRender.vue'),
    props: { pageId: host.pageId }
  });
}

const generateRoute = (to, name) => {
  return {
    name: name,
    path: to.path,
    component: () => import('../view/DynamicRender.vue'),
    props: { pageId: to.query.pageId }
  };
};

router.beforeEach((to) => {
  // console.log(111, to.name, to.fullPath, to.path);
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

  // console.log(222, to.name, to.fullPath, to.path);
  // 路由不存在，就根据跳转的path动态添加路由
  router.addRoute(generateRoute(to, name));
  // 触发重定向
  return to.fullPath;
});

export default router;
