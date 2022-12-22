<template>
    <div class="editor" ref="dom"></div>
</template>
  
<script setup>
import { onMounted, ref, watch } from 'vue';
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
    modelValue: String,
});

const emit = defineEmits(['update:modelValue']);

const dom = ref();

let instance;

onMounted(() => {
    const jsonModel = monaco.editor.createModel(
        props.modelValue,
        'javascript',
        monaco.Uri.parse('ts:filename/facts.d.ts')
    );

    instance = monaco.editor.create(dom.value, {
        model: jsonModel,
        tabSize: 2,
        automaticLayout: true,
        scrollBeyondLastLine: true,
        formatOnType: true,
        formatOnPaste: true
    });

    instance.onDidChangeModelContent(() => {
        emit('update:modelValue',  instance.getValue());
    });
});

watch(props, (newVal) => {
    if (newVal && newVal.modelValue) {
        instance.setValue(newVal.modelValue)
    }
});
</script>
  
<style scoped>
.editor {
    height: 100%;
}
</style>