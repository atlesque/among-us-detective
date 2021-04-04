const types = {
  OPEN_NOTES: "✔️[Opened] notes",
  CLOSE_NOTES: "❌[Closed] notes",
  SET_RESET_NOTES_ON_NEW_GAME: "✔️[Set] reset notes on new game",
};

const state = {
  areNotesOpen: false,
  resetNotesOnNewGame: true,
};

const getters = {};

const mutations = {
  [types.OPEN_NOTES](state) {
    state.areNotesOpen = true;
  },
  [types.CLOSE_NOTES](state) {
    state.areNotesOpen = false;
  },
  [types.SET_RESET_NOTES_ON_NEW_GAME](state, value) {
    state.resetNotesOnNewGame = value;
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
