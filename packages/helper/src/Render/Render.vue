<template>
  <div class="container">
    <div class="group">
      <div v-for="(element, index) in content" :key="index">
        <component
          :is="element.name"
          :key="index"
          :props="element.props"
          :data-index="index"
        ></component>
      </div>
    </div>
  </div>
</template>

<script>
import { CustomerComponents as CustomerComponentsLocal } from '@lowcode/customer';
export default {
  components: {
    ...CustomerComponentsLocal
  },
  props: {
    content: {
      type: Array,
      default: () => {
        return [];
      }
    }
  }
};
</script>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
}

.group {
  width: 100%;
}
</style>
