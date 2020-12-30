
<template>
   <div class="card border-color3 mb-3" style="max-width: 100%;">

      <div class="card-header bg-color3">
         <h5 class="modal-title text-color2">Iniciar sesión</h5>
      </div>

      <form @submit.prevent="submit">

         <div class="card-body bg-color1 p-4">
            <p class="text-color4">Inicie sesión con su usuario y contraseña, si aún no tiene una cuenta de acceso puede <router-link href="" :to="{name: 'register'}" class="text-color3">registrase</router-link> con sus datos personales.</p>

            <div class="mb-3">
               <label for="username-field" class="col-form-label text-color4">Nombre de usuario:</label>
               <input type="text" class="form-control text-color3" id="username-field" v-model="form.username">
            </div>

            <div class="mb-3">
               <label for="password-field" class="col-form-label text-color4">Contraseña:</label>
               <input type="password" class="form-control text-color3" id="password-field" v-model="form.password">
            </div>
         </div>

         <div class="card-footer bg-color1">
            <button type="submit" class="btn btn-color3 text-color2 my-1">Enviar</button>
            <button type="button" class="btn btn-color4 text-color2 my-1 mx-2" @click.prevent="clear">Limpiar campos</button>
         </div>

      </form>

   </div>
</template>

<script>

   import { mapActions, mapGetters } from "vuex";

   export default {
      
      data(){
         return {
            form: {
               username: "",
               password: ""
            }
         }
      },

      computed: {
         ...mapGetters({
            authenticated: "auth/authenticated",
            user: "auth/user"
         })
      },

      methods: {

         showHiddeModalForm(){
            this.modalHidden = !this.modalHidden;
         },

         ...mapActions({
            login: "auth/login"
         }),

         async submit(){
            await this.login(this.form)
               .then(() => {
                  this.$router.push({name: "profile", params: {username: this.user.username}});
               })
               .catch((error) => {
                  console.log(`Error: ${error}`);
               });
         },

         clear(){
            this.form.username = "";
            this.form.password = "";
         }
      }
   }

</script>
