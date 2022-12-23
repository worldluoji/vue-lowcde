<template>
    <div class="simple-table">
        <el-table v-if="tableData && tableData.length > 0" :data="tableData" style="width: 100%">
            <el-table-column prop="date" label="Date" width="180" />
            <el-table-column prop="name" label="Name" width="180" />
            <el-table-column prop="address" label="Address" />
        </el-table>
        <p v-else>暂无数据</p>
    </div>
</template>
  
<script setup>
import { ref, watchEffect, inject } from 'vue';

const $request = inject('$request');
const p = defineProps({
  props: { 
    type: Object,
    default: {}
  }
});

const tableData = ref(null);

const AsyncFunction = Object.getPrototypeOf(async function(){}).constructor;
const getData = async () => {
  // 业务卡片，从后端获取数据
  if (!p.props) {
    return []
  }
  if (p.props.interfaceType === 'ProCode') {
    return await (async function() {
      // console.log('code', p.props.code)
      return await (new AsyncFunction('$request', p.props.code))($request);
    })();
  } else {
    return await $request.get(p.props.url);
  }
}

watchEffect(async () => {
  tableData.value = await getData()
})
</script>

<style scoped>
    .simple-table {
        display: flex;
        justify-content: center;
        align-items: center;
    }
</style>