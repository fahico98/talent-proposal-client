
import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import axios from "axios";
import VueToast from "vue-toast-notification";

import 'vue-toast-notification/dist/theme-default.css';

require("@/store/subscriber");

axios.defaults.baseURL = "http://homestead.test/api/";
//axios.defaults.baseURL = "https://serene-crag-51271.herokuapp.com/api";

Vue.config.productionTip = false;

Vue.use(VueToast);

store.dispatch("auth/attempt", localStorage.getItem("token"))
   .then(() => {
      new Vue({
         router,
         store,
         render: h => h(App)
      }).$mount("#app");
   });
