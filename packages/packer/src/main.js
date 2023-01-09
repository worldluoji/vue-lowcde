import { createApp } from 'vue';
import App from './App.vue';
import router from './router/router';
import { createPinia } from 'pinia';
import elements from '@lowcode/elements';
import { AtomicManager, request } from '@lowcode/helper';

const pinia = createPinia();
const atomicManager = new AtomicManager();

createApp(App)
  .directive('atomicattr', (el, binding) => {
    // console.log(222, el, binding.value)
    atomicManager.setMargin(el, binding);
  })
  .use(router)
  .use(pinia)
  .use(elements.BasicComponents)
  .use(elements.ContainerComponents)
  .use(request)
  .mount('#app');
