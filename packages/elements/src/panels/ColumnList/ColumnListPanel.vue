<template>
  <div class="ListPanel">
    列数:
    <input
      v-model="data.column"
      type="number"
      placeholder="请输入列数"
      @change="change"
    />
    <br />
    间距:
    <input
      v-model="data.gap"
      type="number"
      placeholder="请输入间距"
      @change="change"
    />
    <br />
    列宽：<br />
    <input
      v-for="(it, index) in data.column"
      :key="it"
      type="text"
      :value="templateColumns[index]"
      :placeholder="`第${index + 1}列`"
      @change="changeWidth($event.target.value, index)"
    />
  </div>
</template>

<script setup>
import { reactive, computed } from 'vue';
const p = defineProps({
  props: {
    type: Object,
    required: true
  }
});
const data = reactive({
  column: p.props.column ? p.props.column : 1,
  gap: p.props.gap ? p.props.gap : 0
});

const emit = defineEmits(['change']);

const templateColumns = computed(() => {
  if (p.props && p.props.templateColumns) {
    return p.props.templateColumns.split(' ');
  }
  let t = new Array(data.column);
  t.fill('1fr');
  return t;
});

const changeWidth = (val, i) => {
  templateColumns.value[i] = `${val}`;
  const finalData = {
    ...data,
    templateColumns: templateColumns.value.join(' ')
  };
  emit('change', finalData);
};

const change = () => {
  const finalData = {
    ...data,
    templateColumns: templateColumns.value.join(' ')
  };
  emit('change', finalData);
};
</script>

<style scoped>
.ListPanel {
  width: 100%;
}
</style>
