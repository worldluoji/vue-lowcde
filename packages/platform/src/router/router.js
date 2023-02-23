const routes = [
  {
    path: '/designer',
    name: 'designer',
    component: () => import('../view/Designer.vue')
  },
  {
    path: '/preview',
    name: 'preview',
    component: () => import('../view/Preview.vue')
  },
  {
    path: '/',
    name: 'applist',
    component: () => import('../view/AppList.vue')
  },
  {
    path: '/pagelist',
    name: 'pagelist',
    component: () => import('../view/PageList.vue')
  }
];

// 创建路由实例并传递 `routes` 配置
// 你可以在这里输入更多的配置，但我们在这里暂时保持简单
const router = VueRouter.createRouter({
  // 内部提供了 history 模式的实现。
  history: VueRouter.createWebHashHistory(),
  routes // `routes: routes` 的缩写
});

export default router;
