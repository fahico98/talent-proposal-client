
<template>
   <div class="container my-5">

      <div class="row m-0 p-0">
         <providers-search-form @search="searchProviders($event)" @reset="resetProviders()"/>
      </div>

      <hr style="border-top: 1px solid" class="my-0 py-0 mb-4 mt-2 mx-2">

      <div class="row m-0 p-0">
         <router-link class="d-flex justify-content-start" :to="{name: 'providers_registration'}">

            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="mx-1 text-color3 bi bi-plus-circle" viewBox="0 0 16 16"><path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/><path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"/></svg>
            
            <p class="mb-4 text-color3">Agregar proveedor</p>
         
         </router-link>
      </div>

      <div class="row m-0 p-0">

         <div v-if="providers.length">
            <provider-card v-for="provider in providers" :key="provider.id" :provider="provider"/>
         </div>

         <infinite-loading spinner="spiral" @infinite="loadProviders" :identifier="infiniteId">
            <template v-slot:no-more>
               <p class="fs-5 text-color3 mt-4">No hay mas proveedores !</p>
            </template>
            <template v-slot:no-results>
               <p class="fs-5 text-color3 mt-4">Sin resultados !</p>
            </template>
         </infinite-loading>

         <button class="btn btn-color4" id="back-to-top" :style="'display: ' + backToTopDisplay + ';'" @click="backToTopFunction"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-caret-up-fill mb-1" viewBox="0 0 16 16"><path d="M7.247 4.86l-4.796 5.481c-.566.647-.106 1.659.753 1.659h9.592a1 1 0 0 0 .753-1.659l-4.796-5.48a1 1 0 0 0-1.506 0z"/></svg></button>
         
      </div>

   </div>
</template>

<script>
   
   import ProvidersSearchForm from "../components/providers_components/ProvidersSearchForm";
   import ProviderCard from "../components/providers_components/ProviderCard.vue";
   import InfiniteLoading from "vue-infinite-loading";
   import axios from "axios";

   export default{
      
      components: {
         ProvidersSearchForm,
         InfiniteLoading,
         ProviderCard
      },

      data(){
         return {
            backToTopDisplay: "none",
            infiniteId: +new Date(),
            providers: [],
            currentPage: 0,
            column: "",
            value: ""
         }
      },

      methods: {

         async loadProviders($state){

            this.currentPage++;
            let url = (this.value == "") ? `provider/${this.currentPage}` : `provider/${this.currentPage}/${this.column}/${this.value}`;

            await axios.get(url).then((response) => {

               if(response.data.length){
                  this.providers = this.providers.concat(response.data);
                  $state.loaded();
                  if(response.data.length < 5) $state.complete();

               }else{
                  $state.complete();
               }
            })
            .catch((error) => {
               console.log(`Error: ${error}`);
            });
         },

         searchProviders(data){
            this.column = data.column;
            this.value = data.value;
            this.resetData();
         },

         resetProviders(){
            this.column = "";
            this.value = "";
            this.resetData();
         },

         resetData(){
            this.currentPage = 0;
            this.providers = [];
            this.infiniteId += 1;
         },

         windowScroll(){
            this.backToTopDisplay = document.body.scrollTop > 150 || document.documentElement.scrollTop > 150 ? "block" : "none";
         },

         backToTopFunction(){
            document.body.scrollTop = 0;
            document.documentElement.scrollTop = 0;
         }
      },

      mounted(){
         document.addEventListener("scroll", this.windowScroll);
      },

      beforeDestroy(){
         document.removeEventListener("scroll", this.windowScroll);
      }
   }

</script>

<style scoped>

   #back-to-top {
      display: none; /* Hidden by default */
      position: fixed; /* Fixed/sticky position */
      bottom: 30px; /* Place the button at the bottom of the page */
      right: 30px; /* Place the button 30px from the right */
      z-index: 99; /* Make sure it does not overlap */
      border-radius: 50%;
      height: 50px;
      width: 50px;
   }

</style>
