/*
  Vue native components
*/
import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

Vue.config.productionTip = false;

/*
  Third-party dependencies
*/
import VueGtag from "vue-gtag";

Vue.use(VueGtag, {
  config: { id: "UA-114452911-9" },
});

/* 
  Enable PWA support
*/
import "./registerServiceWorker";

/*
  Initialize the app
*/
new Vue({
  router,
  store,
  render: h => h(App),
}).$mount("#app");
