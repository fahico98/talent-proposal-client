
<template>
   <div>
      <h1>reviews</h1>
   </div>
</template>

<script>

   import { mapGetters } from "vuex";

   export default {
      
      data(){
         return {
            
         }
      },

      computed:{
         ...mapGetters({
            provider: "provider/provider"
         }),
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
