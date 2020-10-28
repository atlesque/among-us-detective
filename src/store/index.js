import Vue from "vue";
import Vuex from "vuex";

// Main data stores
import crew from "./modules/crew";
import darkMode from "./modules/darkmode";
import notes from "./modules/notes";

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    crew,
    darkMode,
    notes,
  },
});

export default store;
