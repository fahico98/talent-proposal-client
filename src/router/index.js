
import Vue from "vue";
import VueRouter from "vue-router";
//import store from "@/store";

import Home from "../views/Home";

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
      component: () => import(/* webpackChunkName: "login" */ "../views/Login")
   },
   {
      path: "/registration",
      name: "users_registration",
      component: () => import(/* webpackChunkName: "userRegistration" */ "../views/UsersRegistration")
   },
   {
      path: "/providers",
      name: "providers",
      component: () => import(/* webpackChunkName: "providers" */ "../views/Providers")
   },
   {
      path: "/providers_registration",
      name: "providers_registration",
      component: () => import(/* webpackChunkName: "providersRegistration" */ "../views/ProvidersRegistration")
   },
   {
      path: "/provider/:provider_id",
      name: "provider_profile",
      redirect: { name: "provider_reviews" },
      component: () => import(/* webpackChunkName: "providerProfile" */ "../views/ProviderProfile"),
      children: [
         {
            path: "reviews",
            name: "provider_reviews",
            component: () => import(/* webpackChunkName: "providerReviews" */ "@/components/providers_components/Reviews")
         },
         {
            path: "features",
            name: "provider_features",
            component: () => import(/* webpackChunkName: "providerFeatures" */ "@/components/providers_components/Features")
         },
         {
            path: "qualify",
            name: "qualify_provider",
            component: () => import(/* webpackChunkName: "providerQualifyProvider" */ "@/components/providers_components/QualifyProvider")
         }
      ]
   },
   {
      path: "/:username",
      name: "user_profile",
      component: () => import(/* webpackChunkName: "userProfile" */ "../views/UserProfile")
   }
];

const router = new VueRouter({
   mode: "history",
   base: process.env.BASE_URL,
   routes
});

export default router;
