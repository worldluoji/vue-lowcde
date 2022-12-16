import { createRouter, createWebHashHistory } from 'vue-router';

const routes = [
  { 
    path: '/', 
    name: 'test',
    component: () => import('./Test.vue'),
  }
]
  
const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router;