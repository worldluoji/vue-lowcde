import { createApp } from 'vue'
import App from './App.vue'
import router from './router/router'
import { createPinia } from 'pinia'
import globalComponents from './components/global/global.js'
import request from './plugins/request'
import AtomicAttributeManager from './atomicmanager'

const pinia = createPinia()

const atomicManager = new AtomicAttributeManager()

createApp(App)
    .directive('atomicattr', (el, binding)=> {
        // console.log(222, el, binding.value)
        atomicManager.setMargin(el, binding)
    })
    .use(router)
    .use(pinia)
    .use(globalComponents)
    .use(request)
    .mount('#app')
