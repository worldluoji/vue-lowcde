<template>
  <div class="SplitLinePanel">
    <el-select
      v-model="direction"
      class="m-2"
      placeholder="方向"
      size="large"
      @change="change"
    >
      <el-option
        v-for="item in directOptions"
        :key="item.value"
        :label="item.label"
        :value="item.value"
      />
    </el-select>
    <el-select
      v-model="borderStyle"
      class="m-2"
      placeholder="样式"
      size="large"
      @change="change"
    >
      <el-option
        v-for="item in styleOptions"
        :key="item.value"
        :label="item.label"
        :value="item.value"
      />
    </el-select>
    <el-input
      v-model="content"
      placeholder="请输入分割线上的内容"
      @change="change"
    />
    <el-select
      v-if="content"
      v-model="contentPosition"
      class="m-2"
      placeholder="内容位置"
      size="large"
      @change="change"
    >
      <el-option
        v-for="item in contentPotisionOptions"
        :key="item.value"
        :label="item.label"
        :value="item.value"
      />
    </el-select>
  </div>
</template>

<script setup>
import { ref } from 'vue';
const p = defineProps({
  props: {
    type: Object,
    default: () => {
      return {};
    }
  }
});

const direction = ref(p.props.direction || 'horizontal');
const borderStyle = ref(p.props.borderStyle || 'solid');
const content = ref(p.props.content || '');
const contentPosition = ref(p.props.contentPosition || 'center');

const directOptions = [
  {
    value: 'horizontal',
    label: 'horizontal'
  },
  {
    value: 'vertical',
    label: 'vertical'
  }
];

const styleOptions = [
  {
    value: 'solid',
    label: 'solid'
  },
  {
    value: 'dashed',
    label: 'dashed'
  },
  {
    value: 'inset',
    label: 'inset'
  },
  {
    value: 'dotted',
    label: 'dotted'
  }
];

const contentPotisionOptions = [
  {
    value: 'center',
    label: 'center'
  },
  {
    value: 'right',
    label: 'right'
  },
  {
    value: 'left',
    label: 'left'
  }
];

const emit = defineEmits(['change']);
const change = () => {
  emit('change', {
    direction: direction.value,
    borderStyle: borderStyle.value,
    content: content.value,
    contentPosition: contentPosition.value
  });
};
</script>

<style scoped>
.SplitLinePanel {
  width: 100%;
}
</style>
