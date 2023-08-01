const modalStore = Pinia.defineStore('modal', {
  state: () => {
    return {
      modals: {
        /*
          id : {id:, name:, type:, props: {},}
        */
      }
    };
  },
  getters: {
    getModalById(state) {
      return (id) => {
        return state.modals[id];
      };
    }
  },
  actions: {
    updateModal(m) {
      this.state.modals[m.id] = m;
    },
    deleteModal(id) {
      delete this.state.modals[id];
    }
  }
});

export default modalStore;
