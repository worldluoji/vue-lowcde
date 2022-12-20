import { createApp } from 'vue'
import './style.css'
import App from './PlantForm.vue'
import router from './router/router'
import { createPinia } from 'pinia'
import globalComponents from './components/global/global.js'
import elements from '@lowcode/elements'
import { DragManager, AtomicManager, request } from '@lowcode/helper'

const pinia = createPinia()

const dragManager = new DragManager()
const atomicManager = new AtomicManager()

createApp(App)
    .directive('draggable', (el) => {
        // v-draggable用在选择物料上，将内部组件加上draggable属性，并监听dragstart；
        el.querySelectorAll('[data-material]').forEach((el) => {
            el.draggable = true
        })
        el.addEventListener('dragstart', (e) => dragManager.dragstart(e))
    })
    .directive('dragcontent', (el, binding) => {
        // 监听了dragover 和 drop
        dragManager.setContainer(el, binding)
    })
    .directive('deps', (el, binding) => {
        dragManager.setDepMap(binding)
    })
    .directive('atomicattr', (el, binding)=> {
        atomicManager.setMargin(el, binding)
    })
    .use(router)
    .use(pinia)
    .use(globalComponents)
    .use(elements.BasicComponents)
    .use(elements.Panels)
    .use(request)
    .mount('#app')
