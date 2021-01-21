
<template>
   <div class="m-0 p-0 container-fluid">
      <div class="row m-0 p-0">

         <div class="m-0 p-0" v-if="features.length">
            <p v-for="feature in features" :key="feature.id">{{ feature.name }}</p>
         </div>

         <div class="m-0 p-0" v-else>
            <p class="fs-5 text-color3 mt-3">Este proveedor no tiene aspectos asignados aún !</p>
         </div>

      </div>
   </div>
</template>

<script>

   export default {

      props: {
         features: {
            type: Array,
            required: true,
            default(){ return [] }
         }
      },
      
      data(){
         return {
            infiniteId: +new Date()
         }
      },

      methods: {
         /*
         async loadFeatures($state){
            await axios.get(`feature/provider_features/${this.$route.params.provider_id}`).then((response) => {

               if(response.data.length){
                  this.features = this.features.concat(response.data);
                  $state.loaded();
                  if(response.data.length) $state.complete();

               }else{
                  $state.complete();
               }
            })
            .catch((error) => {
               console.log(`Error: ${error}`);
            });
         }
         */
      }
   }
</script>
