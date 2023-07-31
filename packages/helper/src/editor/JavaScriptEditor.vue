<template>
  <div class="outer">
    <el-button @click="save">保存</el-button>
    <div ref="dom" class="editor"></div>
  </div>
</template>

<script setup>
import { onMounted, ref, watch, onBeforeUnmount } from 'vue';
import * as monaco from 'monaco-editor';
import EditorWorker from 'monaco-editor/esm/vs/editor/editor.worker?worker';
import TsWorker from 'monaco-editor/esm/vs/language/typescript/ts.worker?worker';

// monaco-editor 会去获取全局变量里的 MonacoEnvironment 对象并执行 getWorker getWorkerUrl 来实现加载对应的语法处理
self.MonacoEnvironment = {
  getWorker(workerId, label) {
    if (label === 'typescript' || label === 'javascript') {
      return new TsWorker();
    }
    return new EditorWorker();
  }
};

const props = defineProps({
  modelValue: {
    type: String,
    default: ''
  },
  attrName: {
    type: String,
    default: ''
  }
});

const emit = defineEmits(['update:modelValue']);

const dom = ref();

let instance;
let jsModel;

onMounted(() => {
  jsModel = monaco.editor.getModel(monaco.Uri.parse('ts:filename/facts.d.ts'));
  if (!jsModel) {
    jsModel = monaco.editor.createModel(
      props.modelValue,
      'javascript',
      monaco.Uri.parse('ts:filename/facts.d.ts')
    );
  } else {
    jsModel.setValue(props.modelValue);
  }

  instance = monaco.editor.create(dom.value, {
    model: jsModel,
    tabSize: 2,
    automaticLayout: true,
    scrollBeyondLastLine: true,
    formatOnType: true,
    formatOnPaste: true
  });

  // instance.onDidChangeModelContent(() => {
  //     emit('update:modelValue',  instance.getValue());
  // });
});

onBeforeUnmount(() => {
  instance.dispose();
  jsModel.dispose();
});

watch(props, (newVal) => {
  if (newVal && newVal.modelValue) {
    instance.setValue(newVal.modelValue);
  }
});

const save = () => {
  emit('update:modelValue', instance.getValue(), props.attrName);
};
</script>

<style scoped>
.editor {
  height: 100%;
}
.outer {
  height: 100%;
}
</style>
