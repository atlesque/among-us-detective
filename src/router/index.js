import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: () => import(/* webpackChunkName: "home" */ "@/views/Home.vue"),
  },
  {
    path: "/disclaimer",
    name: "Disclaimer",
    component: () =>
      import(/* webpackChunkName: "pageNotFound" */ "@/views/Disclaimer.vue"),
  },
  {
    path: "/404-not-found",
    name: "404",
    component: () =>
      import(/* webpackChunkName: "pageNotFound" */ "@/views/PageNotFound.vue"),
  },
  {
    path: "*",
    component: () =>
      import(/* webpackChunkName: "pageNotFound" */ "@/views/PageNotFound.vue"),
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
