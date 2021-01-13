
<template>
   <div class="m-0 p-0 d-inline-flex align-items-center">
      
      <star-empty v-if="score < 0.50" :size="sizeNumber" :classColor="color"/>
      <star-half v-else-if="score >= 0.50 && score < 1" :size="sizeNumber" :classColor="color"/>
      <star-fill v-else-if="score >= 1" :size="sizeNumber" :classColor="color"/>

      <star-empty v-if="score < 1.50" :size="sizeNumber" :classColor="color"/>
      <star-half v-else-if="score >= 1.50 && score < 2" :size="sizeNumber" :classColor="color"/>
      <star-fill v-else-if="score >= 2" :size="sizeNumber" :classColor="color"/>

      <star-empty v-if="score < 2.50" :size="sizeNumber" :classColor="color"/>
      <star-half v-else-if="score >= 2.50 && score < 3" :size="sizeNumber" :classColor="color"/>
      <star-fill v-else-if="score >= 3" :size="sizeNumber" :classColor="color"/>

      <star-empty v-if="score < 3.50" :size="sizeNumber" :classColor="color"/>
      <star-half v-else-if="score >= 3.50 && score < 4" :size="sizeNumber" :classColor="color"/>
      <star-fill v-else-if="score >= 4" :size="sizeNumber" :classColor="color"/>

      <star-empty v-if="score < 4.50" :size="sizeNumber" :classColor="color"/>
      <star-half v-else-if="score >= 4.50 && score < 5" :size="sizeNumber" :classColor="color"/>
      <star-fill v-else-if="score == 5" :size="sizeNumber" :classColor="color"/>

      <span :class="color + ' ' + textClass" class="mb-0 ms-2">{{ corrected }}</span>

   </div>
</template>

<script>

   import StarFill from "./StarFill";
   import StarHalf from "./StarHalf";
   import StarEmpty from "./StarEmpty";

   export default {
      
      components: {
         StarFill,
         StarHalf,
         StarEmpty
      },

      props: {
         score: {
            type: Number,
            default: 0
         },
         size: {
            type: String,
            default: "m"
         }
      },

      computed: {

         corrected(){
            return this.score.toFixed(2);
         },

         sizeNumber(){
            if(this.size == "m"){
               return 22;
            }else{
               return 26;
            }
         },

         textClass(){
            if(this.size == "m"){
               return "h5";
            }else{
               return "h4";
            }
         },

         color(){
            if(this.corrected < 2.00){
               return "text-danger";
            }else if(this.corrected >= 2.00 && this.corrected < 4.00){
               return "text-warning";
            }else{
               return "text-success";
            }
         }
      }
   }
</script>
