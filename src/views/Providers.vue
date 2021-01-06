
<template>
   <div class="container my-5">

      <div class="row m-0 p-0">
         <p>Header !</p>
      </div>

      <div class="row m-0 p-0">

         <div v-if="providers.length">
            <provider-card v-for="provider in providers" :key="provider.id" :provider="provider"/>
         </div>

         <infinite-loading spinner="spiral" @infinite="loadProviders">

            <template v-slot:no-more>
               <p class="fs-5 text-color3 mt-4">No hay mas proveedores !</p>
            </template>

            <template v-slot:no-results>
               <p class="fs-5 text-color3 mt-4">No hay proveedores registrados !</p>
            </template>

         </infinite-loading>
         
      </div>
   </div>
</template>

<script>
   
   import ProviderCard from "../components/providers_components/ProviderCard.vue";
   import InfiniteLoading from "vue-infinite-loading";
   import axios from "axios";

   export default{
      
      components: {
         InfiniteLoading,
         ProviderCard
      },

      data(){
         return {
            providers: [],
            currentPage: 0
         }
      },

      methods: {

         async loadProviders($state){

            this.currentPage++;

            await axios.get(`provider/${this.currentPage}`).then((response) => {

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
         }
      }
   }

</script>
