
<template>
   <div>

      <div v-if="reviews.length">
         <div v-for="review in reviews" :key="review.id" class="card border-color3 bg-color1 my-2">
            <div class="card-body">
               
               <h5 class="text-color4 mb-1" style="cursor: pointer" @click.prevent="goToProviderProfile(review.provider.id)">{{ review.provider.name }}</h5>

               <stars-rating class="mb-2" :score="review.general_score" :size="'m'"/>

               <p class="card-text text-muted my-0" style="font-size: 12px">Hace {{ humanCreationDate(review.created_at) }}.</p>
            
            </div>
         </div>
      </div>

      <infinite-loading spinner="spiral" @infinite="loadReviews" :identifier="infiniteId">
         <template v-slot:no-more>
            <p class="fs-5 text-color3 mt-4">No hay mas calificaciones !</p>
         </template>
         <template v-slot:no-results>
            <p class="fs-5 text-color3 mt-4">Aún sin calificaciones !</p>
         </template>
      </infinite-loading>

   </div>
</template>

<script>

   import esLocale from 'date-fns/locale/es';
   import formatDistanceToNow from 'date-fns/formatDistanceToNow';
   import StarsRating from "../util_components/stars_rating/StarsRating";
   import InfiniteLoading from "vue-infinite-loading";
   import axios from "axios";

   export default {

      components: {
         StarsRating,
         InfiniteLoading
      },

      data(){
         return {
            infiniteId: +new Date(),
            reviews: [],
            currentPage: 0
         }
      },

      watch: {
         async $route(to, from) {
            if(to.params.username != from.params.username){
               this.reviews = [];
               this.currentPage = 0;
               this.infiniteId += 1;
            }
         }
      },

      methods: {

         async loadReviews($state){

            this.currentPage++;

            await axios.get(`review/user_reviews/${this.currentPage}/${this.$route.params.username}`).then((response) => {

               if(response.data.length){
                  this.reviews = this.reviews.concat(response.data);
                  $state.loaded();
                  if(response.data.length < 10) $state.complete();

               }else{
                  $state.complete();
               }
            })
            .catch((error) => {
               console.log(`Error: ${error}`);
            });
         },

         goToProviderProfile(provider_id){
            this.$router.push({
               name: "provider_profile",
               params: { provider_id: provider_id }
            });
         },

         humanCreationDate(date){
            return formatDistanceToNow(new Date(date), {locale: esLocale});
         }
      }
   }

</script>
