
<template>
   <div class="card border-color3 mb-3" style="max-width: 100%;">

      <div class="card-header bg-color3">
         <h5 class="modal-title text-color2">Registro</h5>
      </div>

      <form @submit.prevent="submit">

         <div class="card-body bg-color1 p-4">

            <p class="text-color4">Ingrese sus datos personales para registrarse, si ya tiene una cuenta puede <router-link href="" :to="{name: 'login'}" class="text-color3">iniciar sesión</router-link> con su nombre de usuario y contraseña.</p>

            <div class="mb-3">
               <input type="text" class="form-control form-control-sm text-color3 ph-color3" placeholder="Nombre" v-model="form.firstname">
            </div>

            <div class="mb-3">
               <input type="text" class="form-control form-control-sm text-color3 ph-color3" placeholder="Apellido" v-model="form.lastname">
            </div>

            <div class="mb-3">
               <select class="form-select form-select-sm text-color3" v-model="form.gender">
                  <option value="null" disabled selected hidden>Genero</option>
                  <option value="masculino">Masculino</option>
                  <option value="femenino">Femenino</option>
               </select>
            </div>

            <div class="mb-3">
               <input type="text" class="form-control form-control-sm text-color3 ph-color3" placeholder="Pais" v-model="form.country">
            </div>

            <div class="mb-3">
               <input type="text" class="form-control form-control-sm text-color3 ph-color3" placeholder="Ciudad" v-model="form.city">
            </div>

            <div class="mb-3">
               <input type="text" class="form-control form-control-sm text-color3 ph-color3" placeholder="Número de teléfono" v-model="form.phone_number">
            </div>

            <div class="mb-3">
               <input :type="datepickerType" placeholder="Fecha de nacimiento" class="form-control form-control-sm text-color3 ph-color3" @focus="datepickerType = 'date'" v-model="form.birthday">
            </div>

            <div class="mb-3">
               <input type="text" class="form-control form-control-sm text-color3 ph-color3" placeholder="Correo electrónico" v-model="form.email">
            </div>

            <div class="mb-3">
               <input type="text" class="form-control form-control-sm text-color3 ph-color3" placeholder="Nombre de usuario" v-model="form.username">
            </div>

            <div class="mb-3">
               <input type="password" class="form-control form-control-sm text-color3 ph-color3" placeholder="Contraseña" v-model="form.password">
            </div>

            <div class="mb-1">
               <input type="password" class="form-control form-control-sm text-color3 ph-color3" placeholder="Confirmar contraseña" v-model="form.conf_password">
            </div>
            
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

   import Vue from "vue";

   export default {

      data(){
         return {
            form: {
               firstname: "",
               lastname: "",
               gender: "null",
               country: "",
               city: "",
               phone_number: "",
               birthday: "",
               email: "",
               username: "",
               password: "",
               conf_password: ""
            },
            datepickerType: "text",
            toastMessage: "",
            loading: false
         }
      },

      methods: {

         clear(){
            this.form.firstname = "";
            this.form.lastname = "";
            this.form.gender = "null";
            this.form.country = "";
            this.form.city = "";
            this.form.phone_number = "";
            this.form.birthday = "";
            this.form.email = "";
            this.form.username = "";
            this.form.password = "";
            this.form.conf_password = "";
            this.datepickerType = "text";
         },

         validation(){

         },

         submit(){
            Vue.$toast.open({
               message: "<b>Error: </b> la cagaste !",
               type: "error",
               duration: 5000,
               position: "bottom"
            });
         }
      }
   }

</script>
