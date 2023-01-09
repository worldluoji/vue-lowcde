import { createApp } from 'vue';
import App from './LibTest.vue';
import libs from '../../../dist/origin-elements';
import '../../../dist/style.css';

createApp(App).use(libs.BasicMobileComponents).mount('#app');
