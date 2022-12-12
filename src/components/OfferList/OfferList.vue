<template>
    <div class="offerList" v-atomicattr="p.props.atomicAttrs">
        <div v-for="card in dataList" :key="card.id">
            <van-card
                :num="card.num"
                :price="card.price"
                :desc="card.desc"
                :title="card.title"
                :thumb="card.pic"
            />
        </div>
    </div>
</template>

<script setup>
import { computed } from 'vue'
import { Card } from 'vant'

const p = defineProps({
  props: { 
    type: Object,
    default: {}
  }
})

const defaultItem = {id: 1, title: 'MatePad 10 Pro', desc: 'New MatePad Pro 10.8', price: '2699.00', num: '3', pic: 'https://tse4-mm.cn.bing.net/th/id/OIP-C.Yc1Bz6kwzPTW7MlSMdQMxQHaEK?pid=ImgDet&rs=1'}

const getData = (condition) => {
    if (condition === 'PadList') {
        // TODO，业务卡片，这里实际应该是调用接口从后端获取数据
        return [
            {id: 1, title: 'MatePad 10 Pro', desc: 'New MatePad Pro 10.8', price: '2699.00', num: '3', pic: 'https://tse4-mm.cn.bing.net/th/id/OIP-C.Yc1Bz6kwzPTW7MlSMdQMxQHaEK?pid=ImgDet&rs=1'},
            {id: 2, title: 'IPAD 2022', desc: 'New IPAD 2022 10.8', price: '2899.00', num: '1', pic: 'https://fastly.jsdelivr.net/npm/@vant/assets/ipad.jpeg'},
            {id: 3, title: 'MatePad 11 Pro', desc: 'New MatePad Pro 11', price: '3599.00', num: '3', pic: 'https://tse4-mm.cn.bing.net/th/id/OIP-C.Yc1Bz6kwzPTW7MlSMdQMxQHaEK?pid=ImgDet&rs=1'},
            {id: 4, title: 'IPAD PRO 2022', desc: 'New IPAD Pro 2022', price: '4899.00', num: '1', pic: 'https://fastly.jsdelivr.net/npm/@vant/assets/ipad.jpeg'}
        ]
    } else if (condition === 'PhoneList') {
       return [
            {id: 3, title: 'Huawei P50 pro', desc: 'New Huawei P Series Phonne', price: '3999.00', num: '1', pic: 'https://tse4-mm.cn.bing.net/th/id/OIP-C.nJa7suJ03G2qNvzW9Be_NwHaHa?pid=ImgDet&rs=1'},
            {id: 4, title: 'IPhone 13 Pro', desc: 'New IPhone 2022', price: '4999.00', num: '2', pic: 'https://tse2-mm.cn.bing.net/th/id/OIP-C.gryobSl3Yufb5VTcNCw8fQHaIu?w=144&h=180&c=7&r=0&o=5&dpr=2&pid=1.7'}
        ]
    } else {
        return [defaultItem]
    }
}

const dataList = computed(() => {
    const condition = p.props.condition
    if (condition) {
        return getData(condition)
    } else {
        return [defaultItem] 
    }
})
</script>

<style scoped>
    .offerList {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(360px, 1fr));
        gap: 10px;
    }
</style>