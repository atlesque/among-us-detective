import Vue from "vue";
import Vuex from "vuex";
import VuexPersist from "vuex-persist";

// Main data stores
import crew from "./modules/crew";
import darkMode from "./modules/darkmode";
import notes from "./modules/notes";
import settings from "./modules/settings";

Vue.use(Vuex);

const vuexLocalStorage = new VuexPersist({
  key: "vuex", // The key to store the state on in the storage provider.
  storage: window.localStorage, // or window.sessionStorage or localStorage
  // Everything below will be stored in localStorage, which persists across page reloads
  reducer: state => ({
    settings: state.settings,
  }),
});

const store = new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    crew,
    darkMode,
    notes,
    settings,
  },
  plugins: [vuexLocalStorage.plugin],
});

export default store;
