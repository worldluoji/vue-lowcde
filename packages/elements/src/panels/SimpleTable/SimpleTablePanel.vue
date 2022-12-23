<template>
    <div>
        <el-radio-group v-model="radio">
            <el-radio :label="'LowCode'">接口配置</el-radio>
            <el-radio :label="'ProCode'">高代码</el-radio>
        </el-radio-group>
        <div v-if="radio === 'LowCode'">
            <span class="ml-3 w-35 text-gray-600 inline-flex items-center">
                url: 
            </span>
            <el-input placeholder="请输入请求url" v-model="url" @change="change" />
        </div>
        <div v-else-if="radio === 'ProCode'">
            <el-button text @click="drawVisible = true">
                点我编辑高代码
            </el-button>
            <el-drawer v-model="drawVisible" title="JavaScript编辑器" direction="ttb" :append-to-body="true">
                <JSEditor :modelValue="modelValue" @update:modelValue="change"/>
            </el-drawer>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import { JSEditor } from '@lowcode/helper';
const p = defineProps({
    props: {
        type: Object,
        required: true
    }
})
const radio = ref((p.props && p.props.interfaceType) || 'LowCode');
const url = ref((p.props && p.props.url) || '');
const drawVisible = ref(false);
const modelValue = ref((p.props && p.props.code) || '');

const emit = defineEmits(['change']);
const change = (newVal) => {
    console.log('change', radio.value, url, modelValue.value, newVal);
    if (radio.value === 'LowCode') {
        emit('change', {interfaceType: 'LowCode', url: url.value});
    } else {
        modelValue.value = newVal;
        emit('change', {interfaceType: 'ProCode', code: newVal});
    }
};
</script>

<style scoped>
.dialog-footer button:first-child {
  margin-right: 10px;
}
</style>