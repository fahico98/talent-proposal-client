
<template>
   <div class="m-0 p-0 container-fluid">
      <div class="row m-0 p-0">

         <div class="m-0 p-0 d-flex justify-content-center" v-if="features.length == 0">
            <p class="fs-5 text-color3 mt-3">Este proveedor aún no tiene aspectos asignados!</p>
         </div>
         
         <div class="m-0 p-0" v-else>
            <div class="card border-color3 bg-color1 my-2" v-for="feature in features" :key="feature.id">
               <div class="card-body">
                  <h5 class="text-color4 mb-1">{{ feature.name }}</h5>
                  <p class="text-color4 mb-2" style="font-size: 14px">{{ feature.description }}</p>
                  <stars-rating :score="feature.general_score" :size="'m'" v-if="feature.general_score"/>
               </div>
            </div>
         </div>

      </div>
   </div>
</template>

<script>

   import StarsRating from "../util_components/stars_rating/StarsRating";

   export default {

      components: {
         StarsRating
      },

      props: {
         features: {
            type: Array,
            required: true,
            default(){ return [] }
         }
      },

      watch: {
         features(newFeatures){
            if(newFeatures.length) this.loading = false;
         }
      }
   }
</script>
