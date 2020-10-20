import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Disclaimer from "../views/Disclaimer.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/disclaimer",
    name: "Disclaimer",
    component: Disclaimer,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
