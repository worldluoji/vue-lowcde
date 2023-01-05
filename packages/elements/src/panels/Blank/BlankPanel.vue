<template>
    <div class="BlankPanel">
        请选择组件: 
        <select v-model="data.element" @change="change">
            <option v-for="item in componentList" :key="item.name" :value="item.name">
                {{ item.title }}
            </option>
        </select>
    </div>
</template>

<script setup>
import componentList from '../../components/components.js';
const p = defineProps({
    props: {
        type: Object,
        required: true
    }
})
const data = {
    element: p.props.element ? p.props.element: ''
}
const emit = defineEmits(['change']);
const change = () => {
    // console.log(data)
    emit('change', data);
}
</script>

<style scoped>
    .BlankPanel {
        width: 100%;
    }
</style>