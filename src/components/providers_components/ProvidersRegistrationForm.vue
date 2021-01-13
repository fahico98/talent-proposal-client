
<template>
   <div class="card border-color3 mb-3" style="max-width: 100%;">
   
      <div class="card-header bg-color3">
         <h5 class="modal-title text-color2">Registrar nuevo proveedor</h5>
      </div>

      <form @submit.prevent="submit">

         <div class="card-body bg-color1 p-4">

            <p class="text-color4 pb-2">Ingrese los datos del proveedor para agregarlo a la <router-link :to="{name: 'providers'}" class="text-color3">lista de proveedores</router-link> y así pueda ser calificado por los demas usuarios de la plataforma.</p>

         </div>

         <div class="card-footer bg-color1" v-if="loading">
            <div class="spinner-border text-color3 mt-2 mb-1" role="status">
               <span class="visually-hidden">Cargando...</span>
            </div>
         </div>

         <div class="card-footer bg-color1" v-else>
            <button type="submit" class="btn btn-color3 my-1">Enviar</button>
            <button type="button" class="btn btn-color4 my-1 mx-2" @click.prevent="clear">Limpiar campos</button>
         </div>

      </form>
   
   </div>
</template>

<script>

   export default {
      
      data(){
         return {
            loading: false
         }
      },

      methods: {

         submit(){

         },

         clear(){

         }
      }
   }
</script>
