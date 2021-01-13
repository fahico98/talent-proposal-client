
<template>
   <div class="card border-color3 mb-3" style="max-width: 100%;">

      <div class="card-header bg-color3">
         <h5 class="modal-title text-color2">Registro</h5>
      </div>

      <form @submit.prevent="submit">

         <div class="card-body bg-color1 p-4">

            <p class="text-color4 pb-2">Ingrese sus datos personales para registrarse, si ya tiene una cuenta puede <router-link href="" :to="{name: 'login'}" class="text-color3">iniciar sesión</router-link> con su nombre de usuario y contraseña.</p>

            <div class="mb-3">
               <input type="text" :class="(labels.firstname.error == '' || loading) ? '' : 'is-invalid'" class="form-control form-control-sm text-color3 ph-color3" placeholder="Nombres*" v-model.trim="form.firstname">
               <p :class="(labels.firstname.error == '' || loading) ? 'text-muted' : 'text-danger'" class="mt-1" style="font-size: 12px">{{ (labels.firstname.error == "" || loading) ? labels.firstname.default : labels.firstname.error }}</p>
            </div>

            <div class="mb-3">
               <input type="text" :class="(labels.lastname.error == '' || loading) ? '' : 'is-invalid'" class="form-control form-control-sm text-color3 ph-color3" placeholder="Apellidos*" v-model.trim="form.lastname">
               <p :class="(labels.lastname.error == '' || loading) ? 'text-muted' : 'text-danger'" class="mt-1" style="font-size: 12px">{{ (labels.lastname.error == "" || loading) ? labels.lastname.default : labels.lastname.error }}</p>
            </div>

            <div class="mb-3">
               <select :class="(labels.gender.error == '' || loading) ? '' : 'is-invalid'" class="form-select form-select-sm text-color3" v-model.trim="form.gender">
                  <option value="null" disabled selected hidden>Género*</option>
                  <option value="masculino">Masculino</option>
                  <option value="femenino">Femenino</option>
               </select>
               <p :class="(labels.gender.error == '' || loading) ? 'text-muted' : 'text-danger'" class="mt-1" style="font-size: 12px">{{ (labels.gender.error == "" || loading) ? labels.gender.default : labels.gender.error }}</p>
            </div>

            <div class="mb-3">
               <input :type="datepickerType" placeholder="Fecha de nacimiento*" :class="(labels.birthday.error == '' || loading) ? '' : 'is-invalid'" class="form-control form-control-sm text-color3 ph-color3" @focus="datepickerType = 'date'" v-model.trim="form.birthday">
               <p :class="(labels.birthday.error == '' || loading) ? 'text-muted' : 'text-danger'" class="mt-1" style="font-size: 12px">{{ (labels.birthday.error == "" || loading) ? labels.birthday.default : labels.birthday.error }}</p>
            </div>

            <div class="mb-3">
               <input type="text" :class="(labels.email.error == '' || loading) ? '' : 'is-invalid'" class="form-control form-control-sm text-color3 ph-color3" placeholder="Correo electrónico*" v-model.trim="form.email">
               <p :class="(labels.email.error == '' || loading) ? 'text-muted' : 'text-danger'" class="mt-1" style="font-size: 12px">{{ (labels.email.error == "" || loading) ? labels.email.default : labels.email.error }}</p>
            </div>

            <div class="mb-3">
               <input type="text" :class="(labels.username.error == '' || loading) ? '' : 'is-invalid'" class="form-control form-control-sm text-color3 ph-color3" placeholder="Nombre de usuario*" v-model.trim="form.username">
               <p :class="(labels.username.error == '' || loading) ? 'text-muted' : 'text-danger'" class="mt-1" style="font-size: 12px">{{ (labels.username.error == "" || loading) ? labels.username.default : labels.username.error }}</p>
            </div>

            <div class="mb-3">
               <input type="password" :class="(labels.password.error == '' || loading) ? '' : 'is-invalid'" class="form-control form-control-sm text-color3 ph-color3" placeholder="Contraseña*" v-model.trim="form.password">
               <p :class="(labels.password.error == '' || loading) ? 'text-muted' : 'text-danger'" class="mt-1" style="font-size: 12px">{{ (labels.password.error == "" || loading) ? labels.password.default : labels.password.error }}</p>
            </div>

            <div class="mb-1">
               <input type="password" :class="(labels.password_confirmation.error == '' || loading) ? '' : 'is-invalid'" class="form-control form-control-sm text-color3 ph-color3" placeholder="Confirmar contraseña*" v-model.trim="form.password_confirmation">
               <p :class="(labels.password_confirmation.error == '' || loading) ? 'text-muted' : 'text-danger'" class="mt-1" style="font-size: 12px">{{ (labels.password_confirmation.error == "" || loading) ? labels.password_confirmation.default : labels.password_confirmation.error }}</p>
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

   import * as validator from "@/util/validator";
   import { mapActions, mapGetters } from "vuex";
   import axios from "axios";
   import Vue from "vue";

   export default {

      data(){
         return {
            form: {
               firstname: "",
               lastname: "",
               gender: "null",
               birthday: "",
               email: "",
               username: "",
               password: "",
               password_confirmation: ""
            },
            labels: {
               firstname: { error: "", default: "Nombres completos, no se permiten simbolos." },
               lastname: { error: "", default: "Apellidos completos, no se permiten simbolos." },
               gender: { error: "", default: "Seleccione su género." },
               birthday: { error: "", default: "Debe ser mayor de 18 años para registrarse." },
               email: { error: "", default: "Ingrese una dirección de correo electrónico valida." },
               username: { error: "", default: "Entre 6 y 25 caracteres." },
               password: { error: "", default: "Entre 8 y 35 caracteres." },
               password_confirmation: { error: "", default: "Por favor repita su contraseña." }
            },
            datepickerType: "text",
            formValidated: true,
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

         ...mapActions({
            login: "auth/login"
         }),

         async submit(){
            
            this.loading = true;
            await this.validation();

            if(this.formValidated){

               let response = await axios.post("auth/create", this.form);

               if(response.data.status == 201){

                  await this.login({ "username": this.form.username, "password": this.form.password }).then(() => {
                     
                     this.loading = false;

                     if(this.authenticated){
                        this.$router.push({name: "profile", params: {username: this.user.username}});
                     }else{
                        Vue.$toast.open({
                           message: "<b>Error:</b> Algo salió mal.",
                           type: "error",
                           position: "bottom",
                           duration: 5000
                        });
                     }
                  });

               }else{
                  Vue.$toast.open({
                     message: "<b>Error:</b> Algo salió mal.",
                     type: "error",
                     position: "bottom",
                     duration: 5000
                  });
               }
            }

            this.loading = false;
         },

         clear(){
            this.form.firstname = "";
            this.form.lastname = "";
            this.form.gender = "null";
            this.form.birthday = "";
            this.form.email = "";
            this.form.username = "";
            this.form.password = "";
            this.form.password_confirmation = "";
            this.datepickerType = "text";
            this.resetValidation();
         },

         resetValidation(){
            this.labels.firstname.error = "";
            this.labels.lastname.error = "";
            this.labels.gender.error = ""; 
            this.labels.birthday.error = "";
            this.labels.email.error = "";
            this.labels.username.error = "";
            this.labels.password.error = "";
            this.labels.password_confirmation.error = "";
            this.formValidated = true;
         },

         async validation(){

            this.firstnameValidation();
            this.lastnameValidation();
            this.genderValidation();
            this.birthdayValidation();
            await this.emailValidation();
            await this.usernameValidation();
            this.passwordValidation();
            this.passwordConfirmationValidation();

            this.formValidated = true;

            for(let label in this.labels){
               if(String(this.labels[label].error) !== "") this.formValidated = false; break;
            }
         },

         firstnameValidation(){
            
            let buffer;

            buffer = validator.required(this.form.firstname);
            this.labels.firstname.error = (buffer != null) ? buffer : "";
            if(buffer != null) return;

            buffer = validator.alpha(this.form.firstname);
            this.labels.firstname.error = (buffer != null) ? buffer : "";
            if(buffer != null) return;

            buffer = validator.maxLength(this.form.firstname, 35);
            this.labels.firstname.error = (buffer != null) ? buffer : "";
         },

         lastnameValidation(){
            
            let buffer;

            buffer = validator.required(this.form.lastname);
            this.labels.lastname.error = (buffer != null) ? buffer : "";
            if(buffer != null) return;

            buffer = validator.alpha(this.form.lastname);
            this.labels.lastname.error = (buffer != null) ? buffer : "";
            if(buffer != null) return;

            buffer = validator.maxLength(this.form.lastname, 35);
            this.labels.lastname.error = (buffer != null) ? buffer : "";
         },

         genderValidation(){
            this.labels.gender.error = (this.form.gender == "null") ? "Debe escoger un genero." : "";
         },

         birthdayValidation(){

            let buffer;

            buffer = validator.required(this.form.birthday);
            this.labels.birthday.error = (buffer != null) ? buffer : "";
            if(buffer != null) return;

            buffer = validator.afterToday(this.form.birthday);
            this.labels.birthday.error = (buffer != null) ? buffer : "";
            if(buffer != null) return;

            buffer = validator.rightAge(this.form.birthday);
            this.labels.birthday.error = (buffer != null) ? buffer : "";
         },

         async emailValidation(){

            let buffer;

            buffer = validator.required(this.form.email);
            this.labels.email.error = (buffer != null) ? buffer : "";
            if(buffer != null) return;

            buffer = validator.email(this.form.email);
            this.labels.email.error = (buffer != null) ? buffer : "";
            if(buffer != null) return;

            buffer = validator.maxLength(this.form.email, 35);
            this.labels.email.error = (buffer != null) ? buffer : "";
            if(buffer != null) return;

            buffer = await validator.uniqueEmail(this.form.email);
            this.labels.email.error = (buffer != null) ? buffer : "";
         },

         async usernameValidation(){

            let buffer;

            buffer = validator.required(this.form.username);
            this.labels.username.error = (buffer != null) ? buffer : "";
            if(buffer != null) return;

            buffer = validator.alphaNum(this.form.username);
            this.labels.username.error = (buffer != null) ? buffer : "";
            if(buffer != null) return;

            buffer = validator.spanish(this.form.username);
            this.labels.username.error = (buffer != null) ? buffer : "";
            if(buffer != null) return;

            buffer = validator.minLength(this.form.username, 6);
            this.labels.username.error = (buffer != null) ? buffer : "";
            if(buffer != null) return;

            buffer = validator.maxLength(this.form.username, 25);
            this.labels.username.error = (buffer != null) ? buffer : "";
            if(buffer != null) return;

            buffer = await validator.uniqueUsername(this.form.username);
            this.labels.username.error = (buffer != null) ? buffer : "";
         },

         passwordValidation(){

            let buffer;

            buffer = validator.required(this.form.password);
            this.labels.password.error = (buffer != null) ? buffer : "";
            if(buffer != null) return;

            buffer = validator.minLength(this.form.password, 8);
            this.labels.password.error = (buffer != null) ? buffer : "";
            if(buffer != null) return;

            buffer = validator.maxLength(this.form.password, 35);
            this.labels.password.error = (buffer != null) ? buffer : "";
         },

         passwordConfirmationValidation(){

            let buffer = validator.required(this.form.password_confirmation);
            this.labels.password_confirmation.error = (buffer != null) ? buffer : "";
            if(buffer != null) return;

            this.labels.password_confirmation.error = (this.form.password.localeCompare(this.form.password_confirmation) == 0) ? "" : "Las contraseñas ingresadas no coinciden.";
         }
      }
   }

</script>
