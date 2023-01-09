<template>
  <div v-atomicattr="p.props.atomicAttrs" class="offerList">
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
import { inject, watchEffect, ref } from 'vue';
// eslint-disable-next-line no-unused-vars
import { Card } from 'vant';
const $request = inject('$request');

const p = defineProps({
  props: {
    type: Object,
    default: () => {
      return {};
    }
  }
});

const defaultItem = {
  id: 1,
  title: 'MatePad 10 Pro',
  desc: 'New MatePad Pro 10.8',
  price: '2699.00',
  num: '3',
  pic: 'https://tse4-mm.cn.bing.net/th/id/OIP-C.Yc1Bz6kwzPTW7MlSMdQMxQHaEK?pid=ImgDet&rs=1'
};

const getData = async (condition) => {
  if (condition === 'PadList') {
    // 业务卡片，从后端获取数据
    let res = await $request.get('/v1/products/pad');
    return res;
  } else if (condition === 'PhoneList') {
    return await $request.get('/v1/products/phone');
  } else {
    return [defaultItem];
  }
};

const dataList = ref([]);
watchEffect(async () => {
  const condition = p.props.condition;
  if (condition) {
    dataList.value = await getData(condition);
  } else {
    dataList.value = [defaultItem];
  }
});
</script>

<style scoped>
.offerList {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(360px, 1fr));
  gap: 10px;
}
</style>
