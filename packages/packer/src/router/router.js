import { createRouter, createWebHashHistory } from 'vue-router';

const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('../view/Test1.vue')
  },
  {
    path: '/test1',
    name: 'test1',
    component: () => import('../view/Test1.vue')
  },
  {
    path: '/test2',
    name: 'test2',
    component: () => import('../view/Test2.vue')
  }
];

const router = createRouter({
  history: createWebHashHistory(),
  routes
});

export default router;
