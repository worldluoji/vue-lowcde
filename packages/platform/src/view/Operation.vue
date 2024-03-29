<template>
  <el-page-header :icon="null">
    <template #title>
      <TopAreaLeft />
    </template>
    <template #content>
      <div class="top-area-center">
        <div class="lp-simulator-pane">
          <span class="lp-simulator-pane-item" @click="setCanvasWidth(pcWidth)">
            <i class="next-icon next-large">
              <svg
                width="24"
                height="24"
                viewBox="0 0 48 48"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M8 11C8 9.34315 9.34315 8 11 8H37C38.6569 8 40 9.34315 40 11V32H8V11Z"
                  stroke="#333"
                  stroke-width="4"
                  stroke-linejoin="round"
                />
                <path
                  d="M4 32H44V34C44 37.3137 41.3137 40 38 40H10C6.68629 40 4 37.3137 4 34V32Z"
                  fill="none"
                  stroke="#333"
                  stroke-width="4"
                  stroke-linejoin="round"
                />
              </svg>
            </i>
          </span>
          <span
            class="lp-simulator-pane-item"
            @click="setCanvasWidth(padWidth)"
          >
            <i class="next-icon next-large">
              <svg
                width="24"
                height="24"
                viewBox="0 0 48 48"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect
                  x="5"
                  y="10"
                  width="38"
                  height="30"
                  rx="2"
                  fill="none"
                  stroke="#333"
                  stroke-width="4"
                />
                <path
                  d="M11 27V23"
                  stroke="#333"
                  stroke-width="4"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </i>
          </span>
          <span
            class="lp-simulator-pane-item"
            @click="setCanvasWidth(mobileWidth)"
          >
            <i class="next-icon next-large">
              <svg
                width="24"
                height="24"
                viewBox="0 0 48 48"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M8 30H40V42C40 43.1046 39.1046 44 38 44H10C8.89543 44 8 43.1046 8 42V30Z"
                  fill="none"
                  stroke="#333"
                  stroke-width="4"
                  stroke-linejoin="round"
                />
                <path
                  d="M40 30V6C40 4.89543 39.1046 4 38 4H10C8.89543 4 8 4.89543 8 6V30"
                  stroke="#333"
                  stroke-width="4"
                  stroke-linejoin="round"
                />
                <path
                  d="M22 37H26"
                  stroke="#333"
                  stroke-width="4"
                  stroke-linecap="round"
                />
              </svg>
            </i>
          </span>
          <div class="lp-simulator-width-setter">
            <span class="lp-simulator-width-setter-wrapper">
              <input
                v-model="canvasWidth"
                type="text"
                autocomplete="off"
                height="28"
                @change="setCanvasWidth($event.target.value)"
              />
              <span
                class="next-input-group-addon next-input-group-text next-medium"
                >px</span
              >
            </span>
          </div>
        </div>
      </div>
    </template>
    <template #extra>
      <div class="top-area-right">
        <el-button @click="preview">预览</el-button>
        <MetaData :data="JSON.stringify(meta.get.value, null, 2)" />
        <el-button @click="save">保存</el-button>
      </div>
    </template>
  </el-page-header>
</template>

<script setup>
import { useRouter } from 'vue-router';
import { ref, inject } from 'vue';
import { storeToRefs } from 'pinia';
import MetaData from './MetaData.vue';
import TopAreaLeft from '../components/TopAreaLeft.vue';

const metaStore = inject('$metaStore');
const canvasStore = inject('$canvasStore');

// 画布宽度
const pcWidth = '987';
const padWidth = '768';
const mobileWidth = '375';
const canvas = canvasStore();
const canvasWidth = ref(canvas.getWidth || pcWidth);
const emits = defineEmits(['changeWidth', 'save']);
emits('changeWidth', canvasWidth.value);
const setCanvasWidth = (val) => {
  if (val) {
    canvasWidth.value = val;
    // console.log(val)
    emits('changeWidth', val);
  }
};

// 预览
const meta = storeToRefs(metaStore());
const router = useRouter();
const preview = () => {
  // params传参方式已经废弃了: https://github.com/vuejs/router/blob/main/packages/router/CHANGELOG.md#414-2022-08-22
  // history模式state传参数只能是非响应式数据, 所以这里转了一下，更好的方式是用pinia来存
  canvas.setWidth(canvasWidth.value);
  canvas.setDesign(false);
  router.push({
    name: 'preview',
    path: '/preview'
    // state: {content: JSON.stringify(this.content)}
  });
};

const save = async () => {
  emits('save');
};
</script>

<style scoped>
.top-area {
  display: flex;
  flex-wrap: wrap-reverse;
  background-color: #fff;
  width: 100%;
  margin-bottom: 2px;
  padding: 4px 12px 4px 16px;
}

.top-area-center {
  flex: 1;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin: 0 8px;
}

.lp-simulator-pane {
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 80px;
}

.lp-simulator-pane .lp-simulator-pane-item {
  display: inline-block;
  width: 32px;
  height: 32px;
  border-radius: 3px;
  padding: 6px;
  margin: 0 4px;
  cursor: pointer;
}

.next-icon.next-large .next-icon-remote,
.next-icon.next-large:before {
  width: 24px;
  font-size: 24px;
  line-height: inherit;
}
.next-icon:before {
  display: inline-block;
  vertical-align: middle;
  text-align: center;
}

.lp-simulator-pane .lp-simulator-width-setter {
  position: relative;
  width: 105px;
  height: 32px;
  margin-left: 12px;
  padding: 6px;
}

.next-input-group-addon {
  width: 1px;
  display: table-cell;
  vertical-align: middle;
  white-space: nowrap;
  line-height: 19px;
}

.next-input-group-text {
  color: var(--input-addon-text-color, #999);
  background-color: var(--input-addon-bg-color, #f2f3f7);
  text-align: center;
  border: 1px solid #c4c6cf;
  padding: 1px 5px;
}

.next-input-group-addon:last-child,
.next-input-group-addon:last-child > * {
  border-bottom-left-radius: 0 !important;
  border-top-left-radius: 0 !important;
}
.next-input-group-text.next-medium {
  font-size: 12px;
  border-radius: 3px;
}

input {
  width: 38px;
  padding: 0 5px;
  font-size: 12px;
  height: 22px;
  vertical-align: top;
}

.top-area-right {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 3px;
  padding: 0px 10px;
}

button {
  background-color: #fff;
  border-radius: 5px;
  border-color: var(--btn-pure-normal-border-color, #c4c6cf);
}
</style>
