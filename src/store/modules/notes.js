const types = {
  OPEN_NOTES: "✔️[Opened] notes",
  CLOSE_NOTES: "❌[Closed] notes",
};

const state = {
  areNotesOpen: false,
};

const getters = {};

const mutations = {
  [types.OPEN_NOTES](state) {
    state.areNotesOpen = true;
  },
  [types.CLOSE_NOTES](state) {
    state.areNotesOpen = false;
  },
};

const actions = {
  async setNotesOpenState({ commit }, value) {
    if (value === true) {
      commit(types.OPEN_NOTES);
    } else {
      commit(types.CLOSE_NOTES);
    }
  },
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};
