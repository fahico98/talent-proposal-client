
<template>
   <div class="card border-color3 bg-color1 my-2">
      <div class="card-body d-flex justify-content-between">

         <div>

            <h5 class="text-color4 mb-0" style="cursor: pointer" @click.prevent="goToProfile">{{ provider.name }}</h5>
            <p class="text-color3 mb-0">{{ provider.city }} - {{ provider.country }}.</p>

            <div class="my-4">

               <div class="mb-2 p-0" v-if="provider.general_score != null">
                  
                  <h4 class="text-color4">Calificación general</h4>
                  
                  <stars-rating :score="provider.general_score" :size="'l'"/>

                  <p v-if="provider.review_count == 1" class="card-text text-dark mb-0 mt-2" style="font-size: 12px">Una calificación.</p><p v-else-if="provider.review_count" class="card-text text-dark mb-0 mt-2" style="font-size: 12px">{{ provider.review_count }} calificaciones.</p>
               
               </div>

               <div class="mb-1 p-0" v-else>
                  <h5 class="text-color4">Este proveedor aún no ha sido calificado</h5>
               </div>

            </div>

            <p class="card-text text-muted my-0" style="font-size: 12px">Registrado hace {{ humanCreationDate }}.</p>
            <p class="card-text text-muted my-0" style="font-size: 12px">Ultima actualización hace {{ humanUpdatingDate }}.</p>
         
         </div>

         <div class="dropdown">
            
            <a href="#" class="me-2" data-bs-toggle="dropdown" aria-expanded="false" id="dropdownMenuButton" title="Opciones" @click.prevent="">
               <svg xmlns="http://www.w3.org/2000/svg" width="23" height="23" fill="currentColor" class="text-color3 bi bi-list" viewBox="0 0 16 16"><path fill-rule="evenodd" d="M2.5 11.5A.5.5 0 0 1 3 11h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4A.5.5 0 0 1 3 7h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4A.5.5 0 0 1 3 3h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z"/></svg>
            </a>
            
            <ul class="dropdown-menu dropdown-menu-end" aria-labelledby="dropdownMenuButton">
               <li><a class="dropdown-item" href="#" @click.prevent="goToProfile">Ver perfil</a></li>
               <li><a class="dropdown-item" href="#" @click.prevent="">Calificaciones</a></li>
               <li><a class="dropdown-item" href="#" @click.prevent="">Calificar</a></li>
               <li><a class="dropdown-item" href="#" @click.prevent="">Editar</a></li>
               <li><a class="dropdown-item text-danger" href="#" @click.prevent="">Eliminar</a></li>
            </ul>
            
         </div>

      </div>
   </div>
</template>

<script>

   import esLocale from 'date-fns/locale/es';
   import formatDistanceToNow from 'date-fns/formatDistanceToNow'
   import StarsRating from "./../util_components/stars_rating/StarsRating";

   export default {
      
      components: {
         StarsRating
      },

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
      },

      methods: {

         round(value){
            let num = Number(parseFloat(value).toFixed(2));
            let str = num.toString();
            if(str.length == 1) str += ".00";
            return str;
         },

         goToProfile(){
            this.$router.push({
               name: "provider_profile",
               params: { provider_id: this.provider.id }
            });
         }
      }
   }
</script>
