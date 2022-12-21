<template class="container">
    <div v-if="props && props.element">
        <component :is="props.element" @click.stop="showPanel(props.element)" :props="props.props" :eid="props.id" :design="canvas.isDesign"/>
    </div>
    <div v-else> 
        点击选择卡片
    </div>
</template>

<script>
import {canvasStore, currentPanelStore} from '@lowcode/elements';
export default {
    components: {
    },
    props: {
        props: { 
            type: Object,
            required: true
        },
    },
    data() {
        return {
            currentPanel: currentPanelStore(),
            canvas: canvasStore()
        }
    },
    methods: {
        showPanel(element) {
            const elementObj = {
                id: this.props.id,
                name: element,
            }
            // console.log('blank', elementObj)
            this.currentPanel.set(elementObj)
        }
    }
}

</script>

<style scoped>
    .container {
        padding: 10px 16px;
    }
</style>