import { createApp } from 'vue'
import App from './App.vue'
import AtomicAttributeManager from './atomicmanager.js'
import router from './router/router'
import { createPinia } from 'pinia'
import globalComponents from './components/global/global.js'
import request from './plugins/request.js'

const pinia = createPinia()

const automitAttrManager = new AtomicAttributeManager()

createApp(App)
    .directive('atomicattr', (el, binding)=> {
        // console.log(222, el, binding.value)
        automitAttrManager.setMargin(el, binding)
    })
    .use(router)
    .use(pinia)
    .use(globalComponents)
    .use(request)
    .mount('#app')
