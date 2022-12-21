<template>
    <div class="ListPanel">
        行数: <input type="number" placeholder="请输入列数" v-model="data.row" @change="change"/> <br>
        间距: <input type="number" placeholder="请输入间距" v-model="data.gap" @change="change"/> <br>
        行宽：<br>
        <input type="text" v-for="(it, index) in data.row"
         :key="it" 
         @change="changeWidth($event.target.value, index)"
         :value="templateRows[index]"
         :placeholder="`第${index + 1}行`"/>
    </div>
</template>

<script setup>
import { reactive, computed } from 'vue'
const p = defineProps({
    props: {
        type: Object,
        required: true
    }
})
const data = reactive({
    row: p.props.row ? p.props.row: 1,
    gap: p.props.gap ? p.props.gap: 0
})

const emit = defineEmits(['change']);

const templateRows = computed(() => {
    if (p.props && p.props.templateRows) {
        return p.props.templateRows.split(' ')
    }
    let t = new Array(data.row);
    t.fill('1fr');
    return t;
})

const changeWidth = (val, i) => {
    templateRows.value[i] = `${val}`;
    const finalData = {...data, templateRows: templateRows.value.join(' ')};
    emit('change', finalData);
}

const change = () => {
    const finalData = {...data, templateRows: templateRows.value.join(' ')};
    emit('change', finalData);
}
</script>

<style scoped>
    .ListPanel {
        width: 100%;
    }
</style>