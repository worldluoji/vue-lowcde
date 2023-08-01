<template>
  <div class="common-layout">
    <el-container>
      <el-aside class="aside">
        <el-card class="box-card">
          <template #header>
            <div class="card-header">
              <span>弹窗列表</span>
            </div>
          </template>
          <div
            v-for="m in modalList"
            :key="m.id"
            class="text item"
            @click="clickModal(m)"
          >
            {{ m.name }}
          </div>
        </el-card>
      </el-aside>
      <el-main>
        <div class="modal-config">
          <div v-if="seleted === 'notification'">notification</div>
          <div v-if="seleted === 'message'">message</div>
          <div v-if="seleted === 'dialog'">dialog</div>
        </div>
      </el-main>
    </el-container>
  </div>
</template>

<script setup>
import { inject, ref } from 'vue';
import { storeToRefs } from 'pinia';
const modalStore = inject('$modalStore');
const modals = storeToRefs(modalStore());
const modalList = ref((modals.get || {}).value);
const seleted = ref();

const clickModal = (m) => {
  seleted.value = m;
};
</script>

<style lang="scss" scoped>
.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.text {
  font-size: 1rem;
}

.item {
  margin-bottom: 18px;
}

.box-card {
  width: 100%;
  height: 100vh;
}

.aside {
  width: 250px;
}
</style>
