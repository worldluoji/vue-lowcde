import App from './App.vue';
import router from './router/router';
import { AtomicManager } from '@lowcode/helper';
import { request } from '@lowcode/request';

const pinia = Pinia.createPinia();
const atomicManager = new AtomicManager();

const app = Vue.createApp(App)
  .directive('atomicattr', (el, binding) => {
    atomicManager.setMargin(el, binding);
  })
  .use(router)
  .use(pinia)
  .use(request)
  .use(ElementPlus)
  .use(vant);

const s = document.createElement('script');
// 这里后面要改为从后端获取，就可以实现指向不同的引擎
const url = `${import.meta.env.VITE_RESOURCE_URL}`;
s.type = 'text/javascript';
s.src = url;
s.onload = () => {
  const resources = window.StandardElements;
  app.use(resources.default.BasicMobileComponentsIn);
  app.use(resources.default.BasicWebComponentsIn);
  app.use(resources.default.ContainerComponentsIn);
  app.mount('#app');
};
document.body.appendChild(s);
