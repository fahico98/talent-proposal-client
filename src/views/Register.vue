
<template>
   
   <div class="container my-5 pb-5">
      <div class="row">
         
         <div class="col-lg-5">
            <register-form/>
         </div>

         <div class="col-lg-7 d-lg-flex justify-content-lg-end align-items-lg-start d-none d-md-none d-sm-none d-xs-none">
            <img src="@/assets/images/register.png" alt="Login" width="90%" height="auto">
         </div>
      
      </div>
   </div>

</template>

<script>

   import RegisterForm from "../components/main_components/RegisterForm";

   export default {
      components: {
         RegisterForm
      }
   }

</script>
