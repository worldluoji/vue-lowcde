const languageStore = Pinia.defineStore('language', {
  state: () => {
    return {
      lang: 'en'
    };
  },
  getters: {
    getLang(state) {
      return state.lang;
    }
  },
  actions: {
    setLang(lang) {
      this.lang = lang;
    }
  }
});

export default languageStore;
