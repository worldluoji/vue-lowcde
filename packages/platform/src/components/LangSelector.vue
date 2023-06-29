<template>
  <el-dropdown
    trigger="click"
    class="international"
    @command="handleSetLanguage"
  >
    <div>
      <el-tooltip content="language" :effect="effect">
        <el-button text>
          {{ language === 'zh' ? 'Chinese' : 'English' }}
        </el-button>
      </el-tooltip>
    </div>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item :disabled="language === 'zh'" command="zh">
          Chinese
        </el-dropdown-item>
        <el-dropdown-item :disabled="language === 'en'" command="en">
          English
        </el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<script setup>
import { useI18n } from 'vue-i18n';
import { computed, inject } from 'vue';
const langStore = inject('$langStore');
defineProps({
  effect: {
    type: String,
    default: 'dark',
    validator: function (value) {
      // 这个值必须匹配下列字符串中的一个
      return ['dark', 'light'].includes(value);
    }
  }
});

const store = langStore();
const language = computed(() => store.getLang);

// 切换语言的方法
const i18n = useI18n();
const handleSetLanguage = (lang) => {
  i18n.locale.value = lang;
  store.setLang(lang);
};
</script>
