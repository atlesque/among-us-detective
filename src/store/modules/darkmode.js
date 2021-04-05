const types = {
  SET_DARK_MODE: "✔️[Set] dark mode",
  SET_DARK_MODE_BEEN_SET_BEFORE: "✔️[Set] has dark mode been set before",
};

const state = {
  isDarkMode: false,
  hasDarkModeBeenSetBefore: false,
};

const getters = {};

const mutations = {
  [types.SET_DARK_MODE](state, value) {
    state.isDarkMode = value;
  },
  [types.SET_DARK_MODE_BEEN_SET_BEFORE](state, value) {
    state.hasDarkModeBeenSetBefore = value;
  },
};

const actions = {
  async setDarkMode({ commit, state }, value) {
    commit(types.SET_DARK_MODE, value);
    if (state.hasDarkModeBeenSetBefore === false) {
      commit(types.SET_DARK_MODE_BEEN_SET_BEFORE, true);
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
