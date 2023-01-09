<script setup>
// eslint-disable-next-line no-unused-vars
import { Card } from 'vant';
const p = defineProps({
  props: {
    type: Object,
    default: () => {}
  },
  className: {
    type: String,
    default: ''
  }
});
</script>

<template>
  <div v-atomicattr="p.props.atomicAttrs">
    <van-card
      :num="p.props.num || '1'"
      :price="p.props.price || '2999.00'"
      :desc="p.props.desc || 'New IPAD 10.8inc'"
      :title="p.props.title || 'IPAD 2022'"
      :thumb="
        p.props.pic || 'https://fastly.jsdelivr.net/npm/@vant/assets/ipad.jpeg'
      "
    />
  </div>
</template>
