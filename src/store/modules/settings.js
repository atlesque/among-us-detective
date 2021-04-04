const types = {
  SET_SHOW_COLOR_NAMES: "✔️[Set] show color names",
};

const state = {
  showColorNames: false,
};

const getters = {};

const mutations = {
  [types.SET_SHOW_COLOR_NAMES](state, value) {
    state.showColorNames = value;
  },
};

const actions = {
  async setShowColorNames({ commit }, value) {
    commit(types.SET_SHOW_COLOR_NAMES, value);
  },
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};
