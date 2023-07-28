<template>
  <div class="fast-operation">
    <IConDelete />
  </div>
</template>

<script setup>
import { Delete as IConDelete } from '@element-plus/icons-vue';
</script>

<style scoped lang="scss">
.fast-operation {
  position: absolute;
  right: 0.5em;
  top: -1em;
  font-size: 15px;
  width: 1em;
}
</style>
