
<template>
   
   <div class="container my-5 pb-5">
      <div class="row">
         
         <div class="col-lg-4">
            <login-form/>
         </div>

         <div class="col-lg-8 d-lg-flex justify-content-lg-end align-items-lg-center d-none d-md-none d-sm-none d-xs-none">
            <img src="@/assets/images/login.png" alt="Login" width="90%" height="auto">
         </div>
      
      </div>
   </div>

</template>

<script>
   
   import LoginForm from "../components/main_components/LoginForm";

   export default {
      components: {
         LoginForm
      }   
   }

</script>
