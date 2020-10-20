import Vue from "vue";
import Vuex from "vuex";

// Main data stores
import crew from "./modules/crew";
import darkMode from "./modules/darkmode";

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    crew,
    darkMode,
  },
});

export default store;
