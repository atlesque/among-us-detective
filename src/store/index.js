import Vue from "vue";
import Vuex from "vuex";

// Main data stores
import crew from "./modules/crew";

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    crew,
  },
});

export default store;
