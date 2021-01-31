
<template>
   <div>

      <div v-if="reviews.length">
         <div v-for="review in reviews" :key="review.id" class="card border-color3 bg-color1 my-2">
            <div class="card-body">
               
               <h5 class="text-color4 mb-1" style="cursor: pointer" @click.prevent="goToUserProfile(review.user.username)">{{ review.user.firstname }}&nbsp;{{ review.user.lastname }}</h5>

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

      <button class="btn btn-color4" id="back-to-top" :style="'display: ' + backToTopDisplay + ';'" @click="backToTopFunction"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-caret-up-fill mb-1" viewBox="0 0 16 16"><path d="M7.247 4.86l-4.796 5.481c-.566.647-.106 1.659.753 1.659h9.592a1 1 0 0 0 .753-1.659l-4.796-5.48a1 1 0 0 0-1.506 0z"/></svg></button>

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
            backToTopDisplay: "none",
            infiniteId: +new Date(),
            reviews: [],
            currentPage: 0
         }
      },
      
      watch: {
         async $route(to, from) {
            if(to.params.provider_id != from.params.provider_id){
               this.reviews = [];
               this.currentPage = 0;
               this.infiniteId += 1;
            }
         }
      },

      methods: {

         async loadReviews($state){

            this.currentPage++;

            await axios.get(`review/provider_reviews/${this.currentPage}/${this.$route.params.provider_id}`).then((response) => {

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

         goToUserProfile(username){
            this.$router.push({
               name: "user_profile",
               params: { username: username }
            });
         },

         humanCreationDate(date){
            return formatDistanceToNow(new Date(date), {locale: esLocale});
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
