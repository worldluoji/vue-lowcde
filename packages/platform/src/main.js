import './style.css';
import App from './PlantForm.vue';
import router from './router/router';
import elements from '@lowcode/elements';
import { request, AtomicManager } from '@lowcode/helper';
import DragManager from './manager/drag/DragManager.js';
import i18n from './i18n';

const pinia = Pinia.createPinia();

const dragManager = new DragManager();
const atomicManager = new AtomicManager();

Vue.createApp(App)
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
  .use(elements.BasicMobileComponentsIn)
  .use(elements.BasicWebComponentsIn)
  .use(elements.ContainerComponentsIn)
  .use(elements.Panels)
  .use(request)
  .use(ElementPlus)
  .use(vant)
  .use(i18n)
  .mount('#app');
