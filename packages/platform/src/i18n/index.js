const messages = {
  en: {
    msg: {
      app: 'app'
    }
  },
  zh: {
    msg: {
      app: '应用'
    }
  }
};

const locale = 'en';

const i18n = VueI18n.createI18n({
  // 使用 Composition API 模式，则需要将其设置为false
  legacy: false,
  // 全局注入 $t 函数
  globalInjection: true,
  locale,
  messages
});

export default i18n;
