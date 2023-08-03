import App from './App.vue';
import router from './router/router';
import { AtomicManager } from '@lowcode/helper';
import { request } from '@lowcode/request';

const pinia = Pinia.createPinia();
const atomicManager = new AtomicManager();

const injectResource = (resources) => {
  app.use(resources.default.BasicMobileComponentsIn);
  app.use(resources.default.BasicWebComponentsIn);
  app.use(resources.default.ContainerComponentsIn);
};

const app = Vue.createApp(App)
  .directive('atomicattr', (el, binding) => {
    atomicManager.setMargin(el, binding);
  })
  .use(router)
  .use(pinia)
  .use(request)
  .use(ElementPlus)
  .use(vant);

if (import.meta.env.PROD) {
  const s = document.createElement('script');
  // 这里后面要改为从后端获取，就可以实现指向不同的引擎
  const url = `${
    import.meta.env.VITE_RESOURCE_URL
  }/__StandardElements__.umd.cjs`;
  s.type = 'text/javascript';
  s.src = url;
  s.onload = () => {
    const resources = window.__StandardElements__;
    injectResource(resources);
    app.mount('#app');
  };

  document.body.appendChild(s);
} else {
  const resources = await import('@lowcode/elements');
  injectResource(resources);
  app.mount('#app');
}
