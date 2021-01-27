
<template>
   <div class="container my-5 pb-5">
      <div class="row">

         <div class="col-lg-3 mx-0 px-0">
            <left-side/>
         </div>

         <div class="col-lg-9 px-0 mx-0">
            <div class="ms-5">
               <user-reviews/>
            </div>
         </div>

      </div>
   </div>
</template>

<script>

   import UserReviews from "../components/profile_components/UserReviews";
   import LeftSide from "../components/profile_components/LeftSide";

   export default {
      components: {
         LeftSide,
         UserReviews
      }
   }

</script>
