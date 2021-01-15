
import axios from "axios";

export default {

   namespaced: true,
   
   state: {
      token: null,
      user: null
   },

   getters: {

      authenticated(state){
         return !!state.token && !!state.user;
      },

      user(state){
         return state.user;
      }
   },

   mutations: {
      
      SET_TOKEN(state, token){
         state.token = token;
      },

      SET_USER(state, user){
         state.user = user;
      }
   },
   
   actions: {

      async registration({ dispatch }, form){
         await axios.post("auth/create", form).then((response) => {
            return (response.data.status == 422)
               ? response.data
               : dispatch("attempt", response.data.token);
         });
      },

      async login({ dispatch }, credentials){
         await axios.post("auth/login", credentials).then((response) => {
            return (response.data.error == "Unauthorized" && response.data.status == 401)
               ? response.data
               : dispatch("attempt", response.data.token);
         });
      },

      async attempt({ commit, state }, token){
         
         if(token){ commit("SET_TOKEN", token); }
         if(!state.token){ return; }

         try{
            let response = await axios.get("auth/me");
            commit("SET_USER", response.data);
         }catch(error){
            commit("SET_TOKEN", null);
            commit("SET_USER", null);
         }
      },

      logout({ commit }){
         return axios.post("auth/logout")
            .then(() => {
               commit("SET_TOKEN", null);
               commit("SET_USER", null);
            })
            .catch((error) => {
               console.log(`Error: ${error}`);
            });
      }
   }
};
