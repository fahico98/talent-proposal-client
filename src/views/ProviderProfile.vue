
<template>
   <div class="container my-5 pb-5">
      <div class="container-fluid m-0 p-0">
         <div class="row m-0 p-0 w-100">

            <div class="col-lg-4 ps-0 pe-3" v-if="provider">

               <h2 class="text-color4 mb-0">{{ provider.name }}</h2>
               <p class="mt-0 mb-2" style="font-size: 14px" v-if="provider.description != ''">{{ provider.description }}</p>

               <p class="text-muted mt-0 mb-3" style="font-size: 12px" v-if="provider.general_score == null">Este proveedor aún no ha sido calificado.</p>

               <stars-rating class="mt-0 mb-2" :score="provider.general_score" :size="'l'" v-else/>

               <p v-if="provider.review_count == 1" class="card-text text-dark mb-0 mb-3" style="font-size: 12px">Una calificación.</p><p v-else-if="provider.review_count" class="card-text text-dark mb-0 mb-3" style="font-size: 12px">{{ provider.review_count }} calificaciones.</p>

               <hr style="border-top: 1px solid" class="py-0 mb-3 mt-2">

               <p class="text-color3 my-0" v-if="provider.email != ''"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-envelope" viewBox="0 0 18 18"><path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V4zm2-1a1 1 0 0 0-1 1v.217l7 4.2 7-4.2V4a1 1 0 0 0-1-1H2zm13 2.383l-4.758 2.855L15 11.114v-5.73zm-.034 6.878L9.271 8.82 8 9.583 6.728 8.82l-5.694 3.44A1 1 0 0 0 2 13h12a1 1 0 0 0 .966-.739zM1 11.114l4.758-2.876L1 5.383v5.73z"/></svg> {{ provider.email }}</p>
               
               <p class="text-color3 my-0" v-if="provider.country != '' && provider.city != ''"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-map" viewBox="0 0 18 18"><path fill-rule="evenodd" d="M15.817.113A.5.5 0 0 1 16 .5v14a.5.5 0 0 1-.402.49l-5 1a.502.502 0 0 1-.196 0L5.5 15.01l-4.902.98A.5.5 0 0 1 0 15.5v-14a.5.5 0 0 1 .402-.49l5-1a.5.5 0 0 1 .196 0L10.5.99l4.902-.98a.5.5 0 0 1 .415.103zM10 1.91l-4-.8v12.98l4 .8V1.91zm1 12.98l4-.8V1.11l-4 .8v12.98zm-6-.8V1.11l-4 .8v12.98l4-.8z"/></svg> {{ provider.city }} - {{ provider.country }}</p>

               <p class="text-color3 my-0" v-if="provider.address != ''"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-geo-alt" viewBox="0 0 18 18"><path d="M12.166 8.94c-.524 1.062-1.234 2.12-1.96 3.07A31.493 31.493 0 0 1 8 14.58a31.481 31.481 0 0 1-2.206-2.57c-.726-.95-1.436-2.008-1.96-3.07C3.304 7.867 3 6.862 3 6a5 5 0 0 1 10 0c0 .862-.305 1.867-.834 2.94zM8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10z"/><path d="M8 8a2 2 0 1 1 0-4 2 2 0 0 1 0 4zm0 1a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"/></svg> {{ provider.address }}</p>

               <p class="text-color3 mt-0 mb-3" v-if="provider.phone_number != ''"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-telephone" viewBox="0 0 18 18"><path d="M3.654 1.328a.678.678 0 0 0-1.015-.063L1.605 2.3c-.483.484-.661 1.169-.45 1.77a17.568 17.568 0 0 0 4.168 6.608 17.569 17.569 0 0 0 6.608 4.168c.601.211 1.286.033 1.77-.45l1.034-1.034a.678.678 0 0 0-.063-1.015l-2.307-1.794a.678.678 0 0 0-.58-.122l-2.19.547a1.745 1.745 0 0 1-1.657-.459L5.482 8.062a1.745 1.745 0 0 1-.46-1.657l.548-2.19a.678.678 0 0 0-.122-.58L3.654 1.328zM1.884.511a1.745 1.745 0 0 1 2.612.163L6.29 2.98c.329.423.445.974.315 1.494l-.547 2.19a.678.678 0 0 0 .178.643l2.457 2.457a.678.678 0 0 0 .644.178l2.189-.547a1.745 1.745 0 0 1 1.494.315l2.306 1.794c.829.645.905 1.87.163 2.611l-1.034 1.034c-.74.74-1.846 1.065-2.877.702a18.634 18.634 0 0 1-7.01-4.42 18.634 18.634 0 0 1-4.42-7.009c-.362-1.03-.037-2.137.703-2.877L1.885.511z"/></svg> {{ provider.phone_number }}</p>

            </div>

            <div class="col-lg-4 d-flex justify-content-center align-items-center" style="height: 200px;" v-else>
               <div class="spinner-border text-color3 m-0 p-0" style="width: 30px; height: 30px;" role="status">
                  <span class="visually-hidden">Cargando...</span>
               </div>
            </div>

            <div class="col-lg-8 px-0">

               <div class="d-flex align-items-center">

                  <router-link :to="{name: 'provider_reviews', params: {provider_id: $route.params.provider_id}}" class="d-flex align-items-end mx-2"><svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="currentColor" class="bi bi-list-stars" viewBox="0 0 16 16"><path fill-rule="evenodd" d="M5 11.5a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5z"/><path d="M2.242 2.194a.27.27 0 0 1 .516 0l.162.53c.035.115.14.194.258.194h.551c.259 0 .37.333.164.493l-.468.363a.277.277 0 0 0-.094.3l.173.569c.078.256-.213.462-.423.3l-.417-.324a.267.267 0 0 0-.328 0l-.417.323c-.21.163-.5-.043-.423-.299l.173-.57a.277.277 0 0 0-.094-.299l-.468-.363c-.206-.16-.095-.493.164-.493h.55a.271.271 0 0 0 .259-.194l.162-.53zm0 4a.27.27 0 0 1 .516 0l.162.53c.035.115.14.194.258.194h.551c.259 0 .37.333.164.493l-.468.363a.277.277 0 0 0-.094.3l.173.569c.078.255-.213.462-.423.3l-.417-.324a.267.267 0 0 0-.328 0l-.417.323c-.21.163-.5-.043-.423-.299l.173-.57a.277.277 0 0 0-.094-.299l-.468-.363c-.206-.16-.095-.493.164-.493h.55a.271.271 0 0 0 .259-.194l.162-.53zm0 4a.27.27 0 0 1 .516 0l.162.53c.035.115.14.194.258.194h.551c.259 0 .37.333.164.493l-.468.363a.277.277 0 0 0-.094.3l.173.569c.078.255-.213.462-.423.3l-.417-.324a.267.267 0 0 0-.328 0l-.417.323c-.21.163-.5-.043-.423-.299l.173-.57a.277.277 0 0 0-.094-.299l-.468-.363c-.206-.16-.095-.493.164-.493h.55a.271.271 0 0 0 .259-.194l.162-.53z"/></svg><span class="ms-1">Calificaciones</span></router-link>

                  <router-link :to="{name: 'provider_features', params: {provider_id: $route.params.provider_id}}" class="d-flex align-items-end mx-2"><svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="currentColor" class="bi bi-card-list" viewBox="0 0 16 16"><path d="M14.5 3a.5.5 0 0 1 .5.5v9a.5.5 0 0 1-.5.5h-13a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h13zm-13-1A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h13a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 14.5 2h-13z"/><path d="M5 8a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7A.5.5 0 0 1 5 8zm0-2.5a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5zm0 5a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5zm-1-5a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0zM4 8a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0zm0 2.5a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0z"/></svg><span class="ms-1">Aspectos</span></router-link>

                  <router-link v-if="!reviewed" :to="{name: 'qualify_provider', params: {provider_id: $route.params.provider_id}}" class="d-flex align-items-end mx-2"><svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="currentColor" class="bi bi-star" viewBox="0 0 16 16"><path d="M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.523-3.356c.329-.314.158-.888-.283-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767l-3.686 1.894.694-3.957a.565.565 0 0 0-.163-.505L1.71 6.745l4.052-.576a.525.525 0 0 0 .393-.288l1.847-3.658 1.846 3.658a.525.525 0 0 0 .393.288l4.052.575-2.906 2.77a.564.564 0 0 0-.163.506l.694 3.957-3.686-1.894a.503.503 0 0 0-.461 0z"/></svg><span class="ms-1">Calificar</span></router-link>

               </div>

               <hr style="border-top: 1px solid" class="my-0 py-0 mt-2 mb-3 mx-0">

               <router-view :key="$route.path" :features="features" @updateProvider="updateProvider($event)"/>

            </div>

         </div>
      </div>
   </div>
</template>

<script>

   import StarsRating from "../components/util_components/stars_rating/StarsRating";
   import axios from "axios";

   export default {

      components: {
         StarsRating
      },
      
      data(){
         return { provider: null }
      },

      computed:{
         
         reviewed(){
            return this.provider ? this.provider.reviewed : false;
         },

         features(){
            return this.provider ? this.provider.features : null;
         }
      },

      watch: {
         async $route(to, from) {
            if(to.params.provider_id != from.params.provider_id){
               this.provider = null;
               this.provider = await this.loadProvider(to.params.provider_id);
            }
         }
      },

      methods: {

         async loadProvider(provider_id){
            try{
               let response = await axios.get(`provider/show/${provider_id}`);
               return response.data;
            }catch(error){
               console.log(`Error: ${error}`);
            }
         },

         updateProvider(newProvider){
            this.provider = newProvider;
         }
      },

      async created(){
         this.provider = await this.loadProvider(this.$route.params.provider_id);
      }
   }
</script>

<style scoped>

a{
   color: #1d242b;
}

a:hover{
   color: #1b3349;
}

a.router-link-exact-active {
   color: #0077c0;
}

</style>
