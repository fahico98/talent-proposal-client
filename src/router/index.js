
import Vue from "vue";
import VueRouter from "vue-router";
import store from "@/store";

import Home from "../views/Home";

Vue.use(VueRouter);

const routes = [
   {
      path: "/home",
      alias: "/",
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
      meta: { requiresAuth: true },
      component: () => import(/* webpackChunkName: "providers" */ "../views/Providers")
   },
   {
      path: "/providers_registration",
      name: "providers_registration",
      meta: { requiresAuth: true },
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
            meta: { requiresAuth: true },
            component: () => import(/* webpackChunkName: "providerReviews" */ "@/components/providers_components/Reviews")
         },
         {
            path: "features",
            name: "provider_features",
            meta: { requiresAuth: true },
            component: () => import(/* webpackChunkName: "providerFeatures" */ "@/components/providers_components/Features")
         },
         {
            path: "qualify",
            name: "qualify_provider",
            meta: { requiresAuth: true },
            component: () => import(/* webpackChunkName: "providerQualifyProvider" */ "@/components/providers_components/QualifyProvider")
         }
      ]
   },
   {
      path: "/:username",
      name: "user_profile",
      meta: { requiresAuth: true },
      component: () => import(/* webpackChunkName: "userProfile" */ "../views/UserProfile")
   },
   {
      path: "/404",
      name: "404",
      component: () => import(/* webpackChunkName: "404" */ "../views/404")
   }
];

const router = new VueRouter({
   mode: "history",
   base: process.env.BASE_URL,
   routes
});

/**
 * Global guard.
 */
router.beforeEach((to, from, next) => {
   if(to.name == "404"){
      next();
   }else if(to.matched.some((record) => { return record.meta.requiresAuth; })){
      if(store.getters["auth/authenticated"]){
         next();
      }else{
         next({name: "login"});
      }
   }else{
      if(store.getters["auth/authenticated"]){
         next({
            name: "user_profile",
            params: { username: store.getters["auth/user"].username }
         });
      }else{
         next();
      }
   }
});

export default router;
