
<template>
   <div class="container my-5">

      <div class="row m-0 p-0">
         <provider-search-header @search="searchProviders($event)" @reset="resetProviders()"/>
      </div>

      <hr style="border-top: 1px solid" class="my-0 py-0 mb-4 mt-2 mx-2">

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
         
      </div>

   </div>
</template>

<script>
   
   import ProviderSearchHeader from "../components/providers_components/ProviderSearchForm";
   import ProviderCard from "../components/providers_components/ProviderCard.vue";
   import InfiniteLoading from "vue-infinite-loading";
   import axios from "axios";

   export default{
      
      components: {
         ProviderSearchHeader,
         InfiniteLoading,
         ProviderCard
      },

      data(){
         return {
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
         }
      }
   }

</script>
