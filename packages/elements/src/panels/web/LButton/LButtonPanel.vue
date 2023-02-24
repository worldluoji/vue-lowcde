<template>
  <div class="lBUttonPanel">
    <div>
      按钮名称:
      <el-input
        v-model="buttonName"
        :style="{ width: '70%' }"
        @change="change"
      />
    </div>
    <div>
      按钮类型:
      <el-select
        v-model="buttonType"
        class="m-2"
        placeholder="Select"
        size="large"
        @change="change"
      >
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />
      </el-select>
    </div>
    <div>
      是否圆角：
      <el-radio-group v-model="circle" class="ml-4" @change="change">
        <el-radio :label="false" size="large">方角</el-radio>
        <el-radio :label="true" size="large">圆角</el-radio>
      </el-radio-group>
    </div>
    <div>
      事件类型:
      <el-select
        v-model="eventType"
        class="m-2"
        placeholder="Select"
        size="large"
        @change="change"
      >
        <el-option
          v-for="item in evnetTypes"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />
      </el-select>
      <div v-if="eventType === 'message'">
        消息内容:
        <el-input
          v-model="mg.value"
          type="textarea"
          :style="{ width: '70%' }"
          @change="change"
        />
      </div>
    </div>
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

const buttonName = ref(p.props.buttonName || '按钮名称');

const buttonType = ref(p.props.type || 'primary');
const options = [
  {
    value: 'primary',
    label: 'primary'
  },
  {
    value: 'danger',
    label: 'danger'
  },
  {
    value: 'info',
    label: 'info'
  },
  {
    value: 'warning',
    label: 'warning'
  },
  {
    value: 'success',
    label: 'success'
  }
];

const circle = ref(p.props.circle);

const evnetTypes = [
  {
    value: 'message',
    label: 'message'
  }
];
const eventType = ref(p.props.eventType);

const mg = ref(p.props.mg || {});

const emit = defineEmits(['change']);
const change = () => {
  const data = {
    buttonName: buttonName.value,
    buttonType: buttonType.value,
    circle: circle.value,
    eventType: eventType.value,
    mg: { value: mg.value.value, type: mg.value.type }
  };
  console.log(data);
  emit('change', data);
};
</script>

<style scoped>
.lBUttonPanel {
  width: 100%;
}
</style>
