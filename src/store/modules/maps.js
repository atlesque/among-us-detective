import allMaps from "@/config/maps.js";

const defaultMaps = JSON.parse(JSON.stringify(allMaps));

const types = {
  SET_SELECTED_MAP: "✔️[Set] selected map",
  SET_MAPS: "✔️[Set] maps",
};

const state = {
  selectedMap: JSON.parse(JSON.stringify(defaultMaps[0])),
  maps: JSON.parse(JSON.stringify(defaultMaps)),
};

const getters = {};

const mutations = {
  [types.SET_SELECTED_MAP](state, value) {
    state.selectedMap = value;
  },
  [types.SET_MAPS](state, value) {
    state.maps = value;
  },
};

const actions = {
  async setSelectedMap({ commit }, value) {
    commit(types.SET_SELECTED_MAP, value);
  },
  async setMaps({ commit }, value) {
    commit(types.SET_MAPS, value);
  },
  async resetAllMaps({ commit }) {
    commit(types.SET_MAPS, JSON.parse(JSON.stringify(defaultMaps)));
  },
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};
