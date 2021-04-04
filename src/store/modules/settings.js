const types = {
  SET_SHOW_COLOR_NAMES: "✔️[Set] show color names",
  SET_SHOW_IMPOSTER_CHECKBOX: "✔️[Set] show imposter checkbox",
  SET_SHOW_TASKS_CHECKBOX: "✔️[Set] show tasks checkbox",
  SET_SHOW_MEETINGS_COUNT: "✔️[Set] show meetings count",
  SET_SHOW_PLAYER_NAMES: "✔️[Set] show player names",
  SET_SETTING_MODAL_OPEN_STATE: "✔️[Set] settings modal open state",
  SET_RESET_NOTES_ON_NEW_GAME: "✔️[Set] reset notes on new game",
};

const state = {
  showColorNames: false,
  showImposterCheckbox: true,
  showTasksCheckbox: true,
  showMeetingsCount: true,
  showPlayerNames: false,
  settingsModalOpenState: false,
  resetNotesOnNewGame: true,
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
  [types.SET_SHOW_PLAYER_NAMES](state, value) {
    state.showPlayerNames = value;
  },
  [types.SET_SETTING_MODAL_OPEN_STATE](state, value) {
    state.settingsModalOpenState = value;
  },
  [types.SET_RESET_NOTES_ON_NEW_GAME](state, value) {
    state.resetNotesOnNewGame = value;
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
  async setShowPlayerNames({ commit }, value) {
    commit(types.SET_SHOW_PLAYER_NAMES, value);
  },
  async setSettingsModalOpenState({ commit }, value) {
    commit(types.SET_SETTING_MODAL_OPEN_STATE, value);
  },
  async setResetNotesOnNewGame({ commit }, value) {
    commit(types.SET_RESET_NOTES_ON_NEW_GAME, value);
  },
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};
