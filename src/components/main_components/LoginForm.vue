
<template>
   <div class="card border-color3 mb-3" style="max-width: 100%;">

      <div class="card-header bg-color3">
         <h5 class="modal-title text-color2">Iniciar sesión</h5>
      </div>

      <form @submit.prevent="submit">

         <div class="card-body bg-color1 p-4">

            <p class="text-color4 pb-3">Inicie sesión con su usuario y contraseña, si aún no tiene una cuenta de acceso puede <router-link href="" :to="{name: 'users_registration'}" class="text-color3">registrase</router-link> con sus datos personales.</p>

            <div class="pb-3">
               <input placeholder="Nombre de usuario" type="text" :class="(labels.username.error == '' || loading) ? '' : 'is-invalid'" class="form-control text-color3 ph-color3" id="username-field" v-model="form.username">
               <p :class="(labels.username.error == '' || loading) ? 'text-muted' : 'text-danger'" class="mt-1" style="font-size: 13px">{{ (labels.username.error == '' || loading) ? labels.username.default : labels.username.error }}</p>
            </div>

            <div class="pb-0">
               <input placeholder="Contraseña" type="password" :class="(labels.password.error == '' || loading) ? '' : 'is-invalid'" class="form-control text-color3 ph-color3" id="password-field" v-model="form.password">
               <p :class="(labels.password.error == '' || loading) ? 'text-muted' : 'text-danger'" class="mt-1" style="font-size: 13px">{{ (labels.password.error == '' || loading) ? labels.password.default : labels.password.error }}</p>
            </div>

         </div>

         <div class="card-footer bg-color1" v-if="loading">
            <div class="spinner-border text-color3 mt-2 mb-1" role="status">
               <span class="visually-hidden">Cargando...</span>
            </div>
         </div>

         <div class="card-footer bg-color1" v-else>
            <button type="submit" class="btn btn-color3 text-color2 my-1">Enviar</button>
            <button type="button" class="btn btn-color4 text-color2 my-1 mx-2" @click.prevent="clear">Limpiar campos</button>
         </div>

      </form>

   </div>
</template>

<script>

   import { mapActions, mapGetters } from "vuex";
   import Vue from "vue";

   export default {
      
      data(){
         return {

            form: {
               username: "",
               password: ""
            },
            
            labels: {
               username: { error: "", default: "Ingrese su nombre de usuario." },
               password: { error: "", default: "Ingrese su contraseña." }
            },
            
            loading: false
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
            
            this.validate();

            if(this.labels.username.error == "" && this.labels.password.error == ""){
               
               this.loading = true;

               await this.login(this.form).then(() => {

                  if(this.authenticated){
                     this.$router.push({name: "user_profile", params: {username: this.user.username}});

                  }else{
                     Vue.$toast.open({
                        message: "<b>Error:</b> El nombre de usuario o la contraseña son incorrectos.",
                        type: "error",
                        position: "bottom",
                        duration: 5000
                     });
                  }
               });

               this.loading = false;
            }
         },

         validate(){
            this.labels.username.error = (String(this.form.username).trim() == "") ? "El nombre de usuario es obligatorio." : "";
            this.labels.password.error = (String(this.form.password).trim() == "") ? "La contraseña no puede estár vacía." : "";
         },

         clear(){
            this.form.username = "";
            this.form.password = "";
            this.labels.username.error = "";
            this.labels.password.error = "";
         }
      }
   }

</script>
