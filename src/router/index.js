
import Vue from "vue";
import VueRouter from "vue-router";
//import store from "@/store";

import Home from "../views/Home";
import Login from "../views/Login";
import UserProfile from "../views/UserProfile";
import UsersRegistration from "../views/UsersRegistration";
import Providers from "../views/Providers";
import ProvidersRegistration from "../views/ProvidersRegistration";

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
      path: "/registration",
      name: "users_registration",
      component: UsersRegistration
   },
   {
      path: "/providers",
      name: "providers",
      component: Providers
   },
   {
      path: "/providers_registration",
      name: "providers_registration",
      component: ProvidersRegistration
   },
   {
      path: "/:username",
      name: "user_profile",
      component: UserProfile
   }
];

const router = new VueRouter({
   mode: "history",
   base: process.env.BASE_URL,
   routes
});

export default router;
