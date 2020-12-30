
import Vue from "vue";
import VueRouter from "vue-router";
//import store from "@/store";

import Home from "../views/Home";
import Login from "../views/Login";
import Profile from "../views/Profile";
import Register from "../views/Register";

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
      path: "/:username",
      name: "profile",
      component: Profile,
      /*
      beforeEnter: (to, from, next) => {
         if(store.getters["auth/authenticated"]){
            return next({ name: "home" });
         }
         next();
      }
      */
   }
];

const router = new VueRouter({
   mode: "history",
   base: process.env.BASE_URL,
   routes
});

export default router;
