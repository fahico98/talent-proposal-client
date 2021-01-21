
<template>
   <div>
      <h1>Reviews</h1>
   </div>
</template>

<script>

   //import axios from "axios";

   export default {
      
      data(){
         return {
            reviews: []
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
