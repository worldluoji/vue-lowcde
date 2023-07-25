import './style.css';
import App from './PlantForm.vue';
import router from './router/router';
import { AtomicManager } from '@lowcode/helper';
import { request } from '@lowcode/request';
import DragManager from './manager/drag/DragManager.js';
import i18n from './i18n';

const pinia = Pinia.createPinia();

const dragManager = new DragManager();
const atomicManager = new AtomicManager();

const injectResource = (resources) => {
  app.use(resources.default.BasicMobileComponentsIn);
  app.use(resources.default.BasicWebComponentsIn);
  app.use(resources.default.ContainerComponentsIn);
  app.use(resources.default.Panels);
  app.provide('$langStore', resources.langStore);
  app.provide('$metaStore', resources.metaStore);
  app.provide('$canvasStore', resources.canvasStore);
  app.provide('$currentPanelStore', resources.currentPanelStore);
  app.provide('$containerComponentsInfo', resources.containerComponentsInfo);
  app.provide('$basicWebComponentsInfo', resources.basicWebComponentsInfo);
  app.provide(
    '$basicMobileComponentsInfo',
    resources.basicMobileComponentsInfo
  );
};

const app = Vue.createApp(App)
  .directive('draggable', (el) => {
    // v-draggable用在选择物料上，将内部组件加上draggable属性，并监听dragstart；
    el.querySelectorAll('[data-material]').forEach((el) => {
      el.draggable = true;
    });
    el.addEventListener('dragstart', (e) => dragManager.dragstart(e));
    el.addEventListener('click', (e) => dragManager.click(e));
  })
  .directive('dragcontent', (el, binding) => {
    // 监听了dragover 和 drop
    dragManager.setContainer(el, binding);
  })
  .directive('deps', (el, binding) => {
    dragManager.setDepMap(binding);
  })
  .directive('atomicattr', (el, binding) => {
    atomicManager.setMargin(el, binding);
  })
  .use(router)
  .use(pinia)
  .use(request)
  .use(ElementPlus)
  .use(vant)
  .use(i18n);

if (import.meta.env.PROD) {
  const s = document.createElement('script');
  // 这里从后端获取，就可以实现指向不同的引擎
  const url = `${
    import.meta.env.VITE_RESOURCE_URL
  }/__StandardElements__.umd.cjs`;
  s.type = 'text/javascript';
  s.src = url;
  s.onload = () => {
    const resources = window.__StandardElements__;
    injectResource(resources);
    const link = document.createElement('link');
    link.setAttribute('type', 'text/css');
    link.setAttribute('rel', 'stylesheet');
    link.setAttribute('href', `${import.meta.env.VITE_RESOURCE_URL}/style.css`);
    document.head.appendChild(link);
    app.mount('#app');
  };
  document.body.appendChild(s);
} else {
  const resources = await import('@lowcode/elements');
  injectResource(resources);
  app.mount('#app');
}
