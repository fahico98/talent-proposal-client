
import axios from "axios";
import router from "@/router";

export default {

   namespaced: true,
   
   state: {
      provider: null
   },

   getters: {
      provider(state){
         return state.provider;
      }
   },

   mutations: {
      SET_PROVIDER(state, provider){
         state.provider = provider;
      }
   },
   
   actions: {

      async load({ commit }, provider_id){

         if(!provider_id) return;

         await axios.get(`provider/show/${provider_id}`)
            .then((response) => {
               commit("SET_PROVIDER", response.data);
            })
            .catch((error) => {
               commit("SET_PROVIDER", null);
               if(error.response.status == 404) router.push({name: "home"});
            });
      },

      async refresh({ dispatch, state }){
         await dispatch("load", state.provider.id);
      },

      remove({ commit }){
         commit("SET_PROVIDER", null);
      }
   }
};
