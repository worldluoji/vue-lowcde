<template class="container">
  <div v-if="props && props.element">
    <component :is="props.element" :props="props.props" :eid="props.id" />
  </div>
</template>

<script>
// import { CustomerComponents as CustomerComponentsLocal } from '@lowcode/customer';
export default {
  // components: { ...CustomerComponentsLocal },
  __name: 'Blank',
  props: {
    props: {
      type: Object,
      required: true
    }
  }
};
</script>

<style scoped>
.container {
  padding: 10px 16px;
}
</style>
