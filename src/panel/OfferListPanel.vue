<template>
    <div class="OfferListPanel">
        选择数据: 
        <select v-model="data.condition" @change="change">
            <option value="PadList">获取Pad数据</option>
            <option value="PhoneList">获取Phone数据</option>
        </select>
    </div>
</template>

<script setup>
const p = defineProps({
    props: {
        type: Object,
        required: true
    }
})
const data = {
    condition: p.props.condition ? p.props.condition: ''
}

const emit = defineEmits(['change'])
const change = () => {
    console.log(data)
    emit('change', data)
}
</script>

<style scoped>
    .OfferListPanel {
        width: 100%;
    }
</style>