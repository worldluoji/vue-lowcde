import App from './App.vue';
import router from './router/router';
import elements from '@lowcode/elements';
import { AtomicManager } from '@lowcode/helper';
import { request } from '@lowcode/request';

const pinia = Pinia.createPinia();
const atomicManager = new AtomicManager();

Vue.createApp(App)
  .directive('atomicattr', (el, binding) => {
    atomicManager.setMargin(el, binding);
  })
  .use(router)
  .use(pinia)
  .use(elements.BasicMobileComponentsIn)
  .use(elements.BasicWebComponentsIn)
  .use(elements.ContainerComponentsIn)
  .use(request)
  .use(ElementPlus)
  .use(vant)
  .mount('#app');
