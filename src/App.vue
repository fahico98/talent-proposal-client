
<template>

   <div id="app">

      <navbar/>
      <router-view/>
      <main-footer/>

   </div>

</template>

<script>

   import Navbar from "@/components/main_components/Navbar";
   import MainFooter from "@/components/main_components/MainFooter";

   export default {
      components: {
         Navbar,
         MainFooter
      }
   }
   
</script>
