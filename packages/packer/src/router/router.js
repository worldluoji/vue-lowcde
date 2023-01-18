import { createRouter, createWebHashHistory } from 'vue-router';

const routes = [];

const router = createRouter({
  history: createWebHashHistory(),
  routes
});

// 模拟从后端加载首页数据, 实际应该通过appId从后端获取。
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
  if (to.path === '/') {
    return;
  }
  let name = to.name;
  if (!name) {
    name = to.path.slice(1);
  }
  if (!router.hasRoute(name)) {
    // console.log(222, to.name, to.fullPath, to.path);
    router.addRoute(generateRoute(to, name));
    // 触发重定向
    return to.fullPath;
  }
});

export default router;
