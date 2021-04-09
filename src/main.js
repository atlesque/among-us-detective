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
  Sentry.js error logging
*/
import * as Sentry from "@sentry/vue";
import { Integrations } from "@sentry/tracing";

Sentry.init({
  Vue,
  dsn:
    "https://37f1b1f8849a4412846b47957ee5299c@o568257.ingest.sentry.io/5713136",
  integrations: [new Integrations.BrowserTracing()],
  /* 
    Track release number
  */
  release: `among-us-detective@${process.env.APP_VERSION}`,
  environment:
    process.env.NODE_ENV === "production" ? "production" : "development",
  /*
    If false, will suppress Vue's default error logging.
    Leave true for development
  */
  logErrors: true,
  /*
    Set tracesSampleRate to 1.0 to capture 100%
    of transactions for performance monitoring.
    Use a lower value in production (e.g. 0.2)
  */
  tracesSampleRate: 0.2,
  /* 
    If true, also track child components' performance
  */
  trackComponents: true,
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
