import { createApp } from 'vue';
import App from './LibTest.vue';
import componentsInstall from '../../../dist/origin-elements';
import '../../../dist/style.css';

createApp(App).use(componentsInstall.BasicMobileComponentsIn).mount('#app');
