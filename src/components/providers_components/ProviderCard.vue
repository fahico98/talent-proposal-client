
<template>
   <div class="card border-color3 bg-color1 my-2">
      <div class="card-body">

         <h5 class="card-title text-color4">{{ provider.name }}</h5>
         <p class="card-text text-color4 mb-2">{{ provider.city }} - {{ provider.country }} </p>

         <p class="card-text text-muted my-0" style="font-size: 12px">Registrado: {{ provider.created_at }}</p>
         <p class="card-text text-muted my-0" style="font-size: 12px">Ultima calificación: {{ provider.updated_at }}</p>
      
      </div>
   </div>
</template>

<script>

   export default {
      props: {
         provider: {
            type: Object,
            default(){
               return {
                  name: "",
                  country: "",
                  city: "",
                  address: "",
                  phone_number: "",
                  email: "",
                  review_count: 0,
                  general_score: null
               }
            }
         }
      }
   }
</script>
