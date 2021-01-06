
import Vue from "vue";
import VueRouter from "vue-router";
//import store from "@/store";

import Home from "../views/Home";
import Login from "../views/Login";
import Profile from "../views/Profile";
import Register from "../views/Register";
import Providers from "../views/Providers";

Vue.use(VueRouter);

const routes = [
   {
      path: "/",
      name: "home",
      component: Home
   },
   {
      path: "/login",
      name: "login",
      component: Login
   },
   {
      path: "/register",
      name: "register",
      component: Register
   },
   {
      path: "/providers",
      name: "providers",
      component: Providers
   },
   {
      path: "/:username",
      name: "profile",
      component: Profile
   }
];

const router = new VueRouter({
   mode: "history",
   base: process.env.BASE_URL,
   routes
});

export default router;
