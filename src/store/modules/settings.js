const types = {
  SET_SHOW_COLOR_NAMES: "✔️[Set] show color names",
  SET_SHOW_IMPOSTER_CHECKBOX: "✔️[Set] show imposter checkbox",
  SET_SHOW_TASKS_CHECKBOX: "✔️[Set] show tasks checkbox",
  SET_SHOW_MEETINGS_COUNT: "✔️[Set] show meetings count",
};

const state = {
  showColorNames: false,
  showImposterCheckbox: true,
  showTasksCheckbox: true,
  showMeetingsCount: true,
};

const getters = {};

const mutations = {
  [types.SET_SHOW_COLOR_NAMES](state, value) {
    state.showColorNames = value;
  },
  [types.SET_SHOW_IMPOSTER_CHECKBOX](state, value) {
    state.showImposterCheckbox = value;
  },
  [types.SET_SHOW_TASKS_CHECKBOX](state, value) {
    state.showTasksCheckbox = value;
  },
  [types.SET_SHOW_MEETINGS_COUNT](state, value) {
    state.showMeetingsCount = value;
  },
};

const actions = {
  async setShowColorNames({ commit }, value) {
    commit(types.SET_SHOW_COLOR_NAMES, value);
  },
  async setShowImposterCheckbox({ commit }, value) {
    commit(types.SET_SHOW_IMPOSTER_CHECKBOX, value);
  },
  async setShowTasksCheckbox({ commit }, value) {
    commit(types.SET_SHOW_TASKS_CHECKBOX, value);
  },
  async setShowMeetingsCount({ commit }, value) {
    commit(types.SET_SHOW_MEETINGS_COUNT, value);
  },
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};
