// 本地打包入口，./temp目录中的router和.vue页面通过元数据生成
import { createApp } from 'vue'
import AtomicAttributeManager from './atomicmanager.js'
import { createPinia } from 'pinia'
import globalComponents from './components/global/global.js'
import request from './plugins/request.js'
import App from './PlantForm.vue'
import router from './temp/approuter.js'

const pinia = createPinia()

const automitAttrManager = new AtomicAttributeManager()

createApp(App)
    .directive('atomicattr', (el, binding)=> {
        automitAttrManager.setMargin(el, binding)
    })
    .use(router)
    .use(pinia)
    .use(request)
    .use(globalComponents)
    .mount('#app')