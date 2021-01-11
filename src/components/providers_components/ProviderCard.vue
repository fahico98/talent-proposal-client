
<template>
   <div class="card border-color3 my-2">
      <div class="card-body">

         <h5 class="card-title text-color4">{{ provider.name }}</h5>
         <p class="card-text text-color4 mb-2">{{ provider.city }} - {{ provider.country }} </p>

         <p class="card-text text-muted my-0" style="font-size: 12px">Registrado hace {{ humanCreationDate }}.</p>
         <p class="card-text text-muted my-0" style="font-size: 12px">Ultima actualización hace {{ humanUpdatingDate }}.</p>
      
      </div>
   </div>
</template>

<script>

   import esLocale from 'date-fns/locale/es';
   import formatDistanceToNow from 'date-fns/formatDistanceToNow'

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
                  general_score: null,
                  created_at: "",
                  updated_at: ""
               }
            }
         }
      },

      computed: {

         humanCreationDate(){
            return formatDistanceToNow(new Date(this.provider.created_at), {locale: esLocale});
         },

         humanUpdatingDate(){
            return formatDistanceToNow(new Date(this.provider.updated_at), {locale: esLocale});
         }
      }
   }
</script>
