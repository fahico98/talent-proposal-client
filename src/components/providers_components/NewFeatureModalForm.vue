
<template>
   
   <div class="modal fade" id="newFeatureModalForm" tabindex="-1" aria-labelledby="newFeatureModalFormLabel" aria-hidden="true">
      <div class="modal-dialog">
         <div class="modal-content">

            <div class="modal-header bg-color3">
               <h5 class="modal-title text-color2" id="newFeatureModalFormLabel">Agregar aspecto</h5>
               <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"/>
            </div>
            
            <form @submit.prevent="submit">
            
               <div class="modal-body">

                  <p class="text-color4 py-2">Ingrese los datos del aspecto que desea agregar.</p>
                  
                  <div class="mb-3">
                     <input type="text" :class="(labels.name.error == '' || loading) ? '' : 'is-invalid'" class="form-control form-control-sm text-color3 ph-color3" placeholder="Nombre*" v-model.trim="form.name">
                     <p :class="(labels.name.error == '' || loading) ? 'text-muted' : 'text-danger'" class="mt-1" style="font-size: 12px">{{ (labels.name.error == "" || loading) ? labels.name.default : labels.name.error }}</p>
                  </div>

                  <div class="mb-3">
                     <textarea rows="3" :class="(labels.description.error == '' || loading) ? '' : 'is-invalid'" class="form-control form-control-sm text-color3 ph-color3" placeholder="Descripción*" v-model.trim="form.description" style="resize: none"></textarea>
                     <p :class="(labels.description.error == '' || loading) ? 'text-muted' : 'text-danger'" class="mt-1" style="font-size: 12px">{{ (labels.description.error == "" || loading) ? labels.description.default : labels.description.error }}</p>
                  </div>

               </div>
               
               <div class="modal-footer d-flex justify-content-start" v-if="loading">
                  <div class="spinner-border text-color3 mt-2 mb-1" role="status">
                     <span class="visually-hidden">Cargando...</span>
                  </div>
               </div>

               <div class="modal-footer d-flex justify-content-start" v-else>
                  <button type="submit" class="btn btn-color3">Agregar</button>
                  <button type="button" class="btn btn-color4" ref="cancelButton" data-bs-dismiss="modal" aria-label="Close">Cancelar</button>
               </div>

            </form>

         </div>
      </div>
   </div>

</template>

<script>

   import * as validator from "@/util/validator";
   import axios from "axios";
   import Vue from "vue";

   export default {

      data(){
         return {
            loading: false,
            formValidated: true,
            form: {
               name: "",
               description: "",
            },
            labels: {
               name: { error: "", default: "Nombre del aspecto a evaluar." },
               description: { error: "", default: "Descripción del aspecto a evaluar." }
            }
         }
      },

      props: {
         openEvent: {
            type: Boolean,
            deafult: false
         }
      },

      watch: {
         openEvent(newValue){
            if(newValue){
               this.clear();
               this.$emit("reset-form");
            }
         }
      },
      
      methods: {

         async submit(){

            this.validation();
            if(this.formValidated){

               this.loading = true;
               
               await axios.post("/feature/create", this.form).then((response) => {

                  this.loading = false;
                  
                  if(response.data.status == 422){
                     this.$emit("submit", null);
                     Vue.$toast.open({
                        message: "<b>Error:</b> Ha ocurrido un error durante el registro.",
                        type: "error",
                        position: "bottom",
                        duration: 5000
                     });

                  }else{
                     this.$emit("submit", response.data);
                     Vue.$toast.open({
                        message: "El aspecto se ha agregado a la lista.",
                        type: "info",
                        position: "bottom",
                        duration: 5000
                     });
                  }
               })
               .catch((error) => {
                  console.log(`Error: ${error}`);
               });

               this.$refs.cancelButton.click();
            }
         },

         clear(){
            this.form.name = "";
            this.form.description = "";
            this.resetValidation();
         },

         resetValidation(){
            this.labels.name.error = "";
            this.labels.description.error = "";
            this.formValidated = true;
         },

         validation(){

            this.nameValidation();
            this.descriptionValidation();

            this.formValidated = true;

            if(String(this.labels.name.error) !== ""){
               this.formValidated = false;
               return;
            }

            if(String(this.labels.description.error) !== ""){
               this.formValidated = false;
               return;
            }
         },

         nameValidation(){
            
            let buffer;

            buffer = validator.required(this.form.name);
            this.labels.name.error = (buffer != null) ? buffer : "";
            if(buffer != null) return;

            buffer = validator.alpha(this.form.name);
            this.labels.name.error = (buffer != null) ? buffer : "";
            if(buffer != null) return;

            buffer = validator.maxLength(this.form.name, 255);
            this.labels.name.error = (buffer != null) ? buffer : "";
         },

         descriptionValidation(){

            let buffer;

            buffer = validator.required(this.form.description);
            this.labels.description.error = (buffer != null) ? buffer : "";
            if(buffer != null) return;

            buffer = validator.maxLength(this.form.description, 1000);
            this.labels.description.error = (buffer != null) ? buffer : "";
         }
      }
   }

</script>
