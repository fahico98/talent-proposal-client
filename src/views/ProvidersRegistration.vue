
<template>
   <div class="container my-5 pb-5">
      <div class="row">

         <div class="col-lg-5 d-lg-flex flex-lg-column justify-content-lg-between align-items-lg-center d-none d-md-none d-sm-none d-xs-none">
            <img src="@/assets/images/new_provider.png" alt="New provider" width="90%" height="auto">
            <img src="@/assets/images/new_provider_2.png" alt="New provider" width="90%" height="auto">
         </div>

         <div class="col-lg-7">
            <providers-registration-form/>
         </div>

      </div>
   </div>
</template>

<script>

   import ProvidersRegistrationForm from "../components/providers_components/ProvidersRegistrationForm";

   export default {

      components: {
         ProvidersRegistrationForm
      },
      
      data(){
         return {

         }
      }
   }
</script>
