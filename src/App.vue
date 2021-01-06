
<template>

   <div id="app">

      <navbar/>
      <router-view/>
      <main-footer v-if="footerPermission()"/>

   </div>

</template>

<script>

   import Navbar from "@/components/main_components/Navbar";
   import MainFooter from "@/components/main_components/MainFooter";

   export default {
      
      components: {
         Navbar,
         MainFooter
      },

      data(){
         return {
            noFooterRoutes: [
               "profile",
               "providers"
            ]
         }
      },

      methods: {
         footerPermission(){
            for(var i = 0; i < this.noFooterRoutes.length; i++){
               for(var j = 0; j < this.$route.matched.length; j++){
                  if(this.noFooterRoutes[i] == this.$route.matched[j].name){
                     return false;
                  }
               }
            }
            return true;
         }
      }
   }
   
</script>
