const types = {
  SET_DARK_MODE: "✔️[Set] dark mode",
};

const state = {
  isDarkMode: false,
};

const getters = {};

const mutations = {
  [types.SET_DARK_MODE](state, value) {
    state.isDarkMode = value;
  },
};

const actions = {
  async setDarkMode({ commit }, value) {
    commit(types.SET_DARK_MODE, value);
    localStorage.setItem("hasSetDarkMode", true);
  },
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};
