
<template>
   <div class="m-0 p-0 container-fluid">
      <div class="row m-0 p-0">
         <div class="m-0 p-0">
            <form @submit.prevent="submit">

               <div class="m-0 p-0" v-if="provider">
                  <div class="row m-0 p-0 py-2" v-for="(feature, index) in provider.features" :key="feature.id">
                        
                     <div class="col-lg-2 me-1">
                        <round-slider v-model="scores[index]" line-cap="round" start-angle="290" end-angle="250" min="0" max="5.00" step="0.05" radius="50" width="10" range-color="#0077c0" path-color="#FFF" border-width="0.5"/>
                     </div>

                     <div class="col-lg-9 d-flex flex-column justify-content-center">
                        <p class="text-color3 m-0">{{ feature.name }}</p>
                        <p class="text-color4 m-0" style="font-size: 14px" v-if="feature.description">{{ feature.description }}</p>
                     </div>

                  </div>
               </div>

               <div class="row m-0 p-0 mt-3">

                  <div class="spinner-border text-color3 mt-2 mb-1" role="status" v-if="loading">
                     <span class="visually-hidden">Cargando...</span>
                  </div>

                  <div class="d-inline-flex" v-else>
                     <button type="submit" class="btn btn-color3 me-2">Enviar calificación</button>
                  </div>

               </div>

            </form>
         </div>
      </div>
   </div>
</template>

<script>

   import { mapGetters, mapActions } from "vuex";

   import RoundSlider from "vue-round-slider";
   import axios from "axios";
   import Vue from "vue";

   export default {

      components: {
         RoundSlider
      },

      data(){
         return {
            loading: false,
            scores: []
         }
      },

      computed:{
         ...mapGetters({
            provider: "provider/provider"
         }),
      },

      watch:{
         provider(newProvider){
            if(newProvider){
               this.scores = new Array(newProvider.features.length);
               this.scores.fill(2.5);
            }
         }
      },

      mounted(){
         if(this.provider){
            this.scores = new Array(this.provider.features.length);
            this.scores.fill(2.5);
         }
      },

      methods: {

         ...mapActions({
            refreshProvider: "provider/refresh",
            incrementUserReviewCount: "auth/incrementUserReviewCount"
         }),

         async submit(){
            
            if(this.provider.features.length){

               this.loading = true;
               let features = [...this.provider.features];

               features.forEach((feature, index) => {
                  feature.score = this.scores[index];
               });

               await axios.post("provider/qualify", {
                  features: features, provider_id: this.provider.id
               })
               .then(async (response) => {
                  if(response.data.status == 200){
                     await this.refreshProvider();
                     this.incrementUserReviewCount();
                     Vue.$toast.open({
                        message: "La calificación se ha registrado satisfactoriamente.",
                        type: "info",
                        position: "bottom",
                        duration: 5000
                     });
                     this.$router.push({name: "provider_profile", provider_id: this.$route.provider_id});
                  }
               })
               .catch(() => {
                  Vue.$toast.open({
                     message: "<b>Error:</b> Ha ocurrido un error al registrar la calificación.",
                     type: "error",
                     position: "bottom",
                     duration: 5000
                  });
               });

               this.loading = false;
            }
         }
      }
   }
</script>
