
<template>
   <div class="m-0 p-0 container-fluid">
      <div class="row m-0 p-0">

         <div v-if="!provider" class="d-flex justify-content-center align-items-center" style="height: 100px; width: 100%;">
            <div class="spinner-border text-color3 m-0 p-0" style="width: 30px; height: 30px;" role="status">
               <span class="visually-hidden">Cargando...</span>
            </div>
         </div>

         <div class="m-0 p-0" v-else-if="!provider.features.length">
            <p class="fs-5 text-color3 mt-3">Este proveedor no tiene aspectos asignados aún !</p>
         </div>

         <div class="m-0 p-0" v-else>
            <p v-for="feature in provider.features" :key="feature.id">{{ feature.name }}</p>
         </div>

      </div>
   </div>
</template>

<script>

   import { mapGetters } from "vuex";

   export default {

      data(){
         return {
            
         }
      },

      methods: {
      },

      computed:{
         ...mapGetters({
            provider: "provider/provider"
         }),
      }
   }
</script>
