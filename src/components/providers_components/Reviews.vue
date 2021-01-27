
<template>
   <div class="m-0 p-0 container-fluid">
      <div class="row m-0 p-0">
         
         <div v-if="!provider" class="d-flex justify-content-center align-items-center" style="height: 100px; width: 100%;">
            <div class="spinner-border text-color3 m-0 p-0" style="width: 30px; height: 30px;" role="status">
               <span class="visually-hidden">Cargando...</span>
            </div>
         </div>

         <div class="m-0 p-0 d-flex justify-content-center" v-else-if="!provider.reviews.length">
            <p class="fs-5 text-color3 mt-3">Este proveedor aún no ha sido calificado!</p>
         </div>

         <div class="m-0 p-0" v-else>
            <div class="card border-color3 bg-color1 my-2" v-for="review in provider.reviews" :key="review.id">
               <div class="card-body">

                  <h5 class="text-color4 mb-1" style="cursor: pointer" @click.prevent="goToProfile(review.user.username)">{{ review.user.firstname }}&nbsp;{{ review.user.lastname }}</h5>

                  <stars-rating class="mb-2" :score="review.general_score" :size="'m'"/>

                  <p class="card-text text-muted my-0" style="font-size: 12px">Hace {{ humanCreationDate(review.created_at) }}.</p>

               </div>
            </div>
         </div>

      </div>
   </div>
</template>

<script>

   import esLocale from 'date-fns/locale/es';
   import formatDistanceToNow from 'date-fns/formatDistanceToNow';
   import StarsRating from "../util_components/stars_rating/StarsRating";

   import { mapGetters } from "vuex";

   export default {
      
      components: {
         StarsRating
      },

      computed:{
         ...mapGetters({
            provider: "provider/provider"
         })
      },

      methods: {

         humanCreationDate(date){
            return formatDistanceToNow(new Date(date), {locale: esLocale});
         },

         goToProfile(username){
            this.$router.push({
               name: "user_profile",
               params: { username: username }
            });
         }
      },

      async created(){
         /*
         await axios.get(`provider/show/${this.$route.params.provider_id}`).then((response) => {
            this.provider = response.data;
            this.loading = false;
         })
         .catch((error) => {
            console.log(`Error: ${error}`);
         });
         */
      }

   }
</script>
