<template>
    <div class="OfferPanel">
        商品名称: <input type="text" placeholder="请输入商品名称" v-model="data.title" @change="change"/> <br>
        商品描述: <input type="text" placeholder="请输入商品描述" v-model="data.desc" @change="change"/> <br>
        商品数量: <input type="number" placeholder="请输入商品数量" v-model="data.num" @change="change"/> <br>
        商品价格: <input type="number" placeholder="请输入商品价格" v-model="data.price" @change="change"/> <br>
        商品图片: <input type="text" placeholder="请输入商品图片地址" v-model="data.pic" @change="change"/>
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
    title: p.props.title ? p.props.title: 'IPAD 2022',
    desc: p.props.desc ? p.props.desc: 'New IPAD 10.8inc',
    num: p.props.num ? p.props.num: '1',
    price: p.props.price ? p.props.price: '2999.00',
    pic: p.props.pic ? p.props.pic: 'https://fastly.jsdelivr.net/npm/@vant/assets/ipad.jpeg'
}

const emit = defineEmits(['change'])
const change = () => {
    // console.log(data)
    emit('change', data)
}
</script>

<style scoped>
    .OfferPanel {
        width: 100%;
    }
</style>