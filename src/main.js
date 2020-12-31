
import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import axios from "axios";
import VueToast from 'vue-toast-notification';

import 'vue-toast-notification/dist/theme-default.css';

require("@/store/subscriber");

axios.defaults.baseURL = "http://homestead.test/api/";

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
