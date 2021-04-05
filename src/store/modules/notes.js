const types = {
  SET_NOTES_MODAL_OPEN_STATE: "✅[Set] notes modal open state",
};

const state = {
  areNotesOpen: false,
};

const getters = {};

const mutations = {
  [types.SET_NOTES_MODAL_OPEN_STATE](state, value) {
    state.areNotesOpen = value;
  },
};

const actions = {
  async setNotesOpenState({ commit }, value) {
    commit(types.SET_NOTES_MODAL_OPEN_STATE, value);
  },
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};
