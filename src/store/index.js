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

if (module.hot) {
  module.hot.accept(["./modules/crew"], () => {
    store.hotUpdate({
      modules: {
        crew: require("./modules/crew").default,
      },
    });
  });
}

export default store;
