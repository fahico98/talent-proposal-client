
<template>
   <div>

      <div v-if="reviews.length">
         <div v-for="review in reviews" :key="review.id" class="card border-color3 bg-color1 my-2">
            <div class="card-body d-flex justify-content-between">
               {{ review.general_score }}
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

   import InfiniteLoading from "vue-infinite-loading";
   import axios from "axios";

   export default {

      components: {
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
                  if(response.data.length < 5) $state.complete();

               }else{
                  $state.complete();
               }
            })
            .catch((error) => {
               console.log(`Error: ${error}`);
            });
         },
      }
   }

</script>
