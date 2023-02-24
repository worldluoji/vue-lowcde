const currentPanelStore = Pinia.defineStore('currentPanel', {
  state: () => {
    return {
      current: {}
    };
  },
  getters: {
    get(state) {
      return state.current;
    }
  },
  actions: {
    set(c) {
      this.current = c;
    }
  }
});

export default currentPanelStore;
