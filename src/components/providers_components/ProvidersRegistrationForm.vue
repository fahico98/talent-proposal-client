
<template>
   <div class="card border-color3 mb-3" style="max-width: 100%;">
   
      <div class="card-header bg-color3">
         <h5 class="modal-title text-color2">Registrar nuevo proveedor</h5>
      </div>

      <form @submit.prevent="submit">

         <div class="card-body bg-color1 p-4">

            <p class="text-color4 pb-2">Ingrese los datos del proveedor para agregarlo a la <router-link :to="{name: 'providers'}" class="text-color3">lista de proveedores</router-link> y así pueda ser calificado por los demas usuarios de la plataforma.</p>

            <div class="mb-3">
               <input type="text" :class="(labels.name.error == '' || loading) ? '' : 'is-invalid'" class="form-control form-control-sm text-color3 ph-color3" placeholder="Nombre*" v-model.trim="form.name">
               <p :class="(labels.name.error == '' || loading) ? 'text-muted' : 'text-danger'" class="mt-1" style="font-size: 12px">{{ (labels.name.error == "" || loading) ? labels.name.default : labels.name.error }}</p>
            </div>

            <div class="mb-3">
               <input type="text" :class="(labels.country.error == '' || loading) ? '' : 'is-invalid'" class="form-control form-control-sm text-color3 ph-color3" placeholder="País*" v-model.trim="form.country">
               <p :class="(labels.country.error == '' || loading) ? 'text-muted' : 'text-danger'" class="mt-1" style="font-size: 12px">{{ (labels.country.error == "" || loading) ? labels.country.default : labels.country.error }}</p>
            </div>

            <div class="mb-3">
               <input type="text" :class="(labels.city.error == '' || loading) ? '' : 'is-invalid'" class="form-control form-control-sm text-color3 ph-color3" placeholder="Ciudad*" v-model.trim="form.city">
               <p :class="(labels.city.error == '' || loading) ? 'text-muted' : 'text-danger'" class="mt-1" style="font-size: 12px">{{ (labels.city.error == "" || loading) ? labels.city.default : labels.city.error }}</p>
            </div>

            <div class="mb-3">
               <input type="text" :class="(labels.address.error == '' || loading) ? '' : 'is-invalid'" class="form-control form-control-sm text-color3 ph-color3" placeholder="Dirección*" v-model.trim="form.address">
               <p :class="(labels.address.error == '' || loading) ? 'text-muted' : 'text-danger'" class="mt-1" style="font-size: 12px">{{ (labels.address.error == "" || loading) ? labels.address.default : labels.address.error }}</p>
            </div>

            <div class="mb-3">
               <input type="text" :class="(labels.phone_number.error == '' || loading) ? '' : 'is-invalid'" class="form-control form-control-sm text-color3 ph-color3" placeholder="Teléfono de contacto*" v-model.trim="form.phone_number">
               <p :class="(labels.phone_number.error == '' || loading) ? 'text-muted' : 'text-danger'" class="mt-1" style="font-size: 12px">{{ (labels.phone_number.error == "" || loading) ? labels.phone_number.default : labels.phone_number.error }}</p>
            </div>

            <div class="mb-3">
               <input type="text" :class="(labels.email.error == '' || loading) ? '' : 'is-invalid'" class="form-control form-control-sm text-color3 ph-color3" placeholder="Correo electrónico*" v-model.trim="form.email">
               <p :class="(labels.email.error == '' || loading) ? 'text-muted' : 'text-danger'" class="mt-1" style="font-size: 12px">{{ (labels.email.error == "" || loading) ? labels.email.default : labels.email.error }}</p>
            </div>

            <div class="mb-4">
               <textarea rows="3" :class="(labels.description.error == '' || loading) ? '' : 'is-invalid'" class="form-control form-control-sm text-color3 ph-color3" placeholder="Descripción" v-model.trim="form.description" style="resize: none"></textarea>
               <p :class="(labels.description.error == '' || loading) ? 'text-muted' : 'text-danger'" class="mt-1" style="font-size: 12px">{{ (labels.description.error == "" || loading) ? labels.description.default : labels.description.error }}</p>
            </div>

            <div class="mb-3">

               <p class="text-color3 mb-2">Aspectos</p>

               <div class="list-group" style="overflow-y: scroll; width: 100%; height: 200px; border-top: 0.2px solid #dfdfdf; border-bottom: 0.2px solid #dfdfdf; border-right: 0.2px solid #dfdfdf;">

                  <label class="list-group-item" v-for="feature in features" :key="feature.id" style="cursor: pointer;">
                     <input class="form-check-input me-2" type="checkbox" :value="feature" v-model="selectedFeatures"><span class="text-color3" style="font-size: 14px;">{{ feature.name }}</span><p class="text-muted mt-1 mb-0" style="font-size: 12px">{{ feature.description }}</p>
                  </label>

               </div>

               <p class="mt-1 mb-2" style="font-size: 12px"><a href="#" class="text-color3" @click.prevent="allFeaturesSelected ? unselectAllFeatures() : selectAllFeatures()">{{ (allFeaturesSelected) ? "Quitar todos" : "Seleccionar todos" }}</a></p>

               <p :class="(labels.features.error == '' || loading) ? 'text-muted' : 'text-danger'" class="mt-1" style="font-size: 12px">
                  <span v-if="labels.features.error == '' || loading">Seleccione los aspectos a traves de los cuales el proveedor será calificado, estos sapectos definiran la forma en la que el proveedor obtiene su puntaje general. Tiene la opción de <a href="#" class="text-color3" @click="newFeatureModalFormOpen = true" data-bs-target="#newFeatureModalForm" data-bs-toggle="modal">definir un aspecto nuevo</a> si los que están en la lista no describen de que forma quiere que el proveedor sea evaluado.</span>
                  <span v-else>{{ labels.features.error }}</span>
               </p>

               <new-feature-modal-form @submit="newFeatureModalFormSubmit($event)" @reset-form="newFeatureModalFormReset" :open-event="newFeatureModalFormOpen"/>

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

   import NewFeatureModalForm from "./NewFeatureModalForm";
   import * as validator from "@/util/validator";
   import axios from "axios";
   import Vue from "vue";

   export default {

      components: {
         NewFeatureModalForm
      },
      
      data(){
         return {
            features: [],
            selectedFeatures: [],
            loading: true,
            formValidated: true,
            newFeatureModalFormOpen: false,
            allFeaturesSelected: false,
            form: {
               name: "",
               country: "",
               city: "",
               address: "",
               phone_number: "",
               email: "",
               description: ""
            },
            labels: {
               name: { error: "", default: "Nombre de la empresa que figurará como proveedor." },
               country: { error: "", default: "País de la empresa." },
               city: { error: "", default: "Ciudad de la empresa, departamento y municipio." },
               address: { error: "", default: "Dirección de la empresa." },
               phone_number: { error: "", default: "Número de teléfono de la empresa." },
               email: { error: "", default: "Dirección de correo electrónico de la empresa." },
               description: { error: "", default: "Descripción de la empresa, productos y/o servicios que ofrece." },
               features: {error: "", default: "default"}
            }
         }
      },

      watch: {
         selectedFeatures(newArray){
            this.allFeaturesSelected = newArray.length == this.features.length;
         }
      },

      async created(){
         await axios.get("feature").then((response) => {
            this.features = response.data;
            this.loading = false;
         })
         .catch((error) => {
            console.log(`Error: ${error}`);
         });
      },

      methods: {

         async submit(){

            this.loading = true;
            await this.validation();

            if(this.formValidated){
               await axios.post("provider/create", {form: this.form, selectedFeatures: this.selectedFeatures})
                  .then((response) => {

                     if(response.data.status == 422){
                        Vue.$toast.open({
                           message: "<b>Error:</b> Ha ocurrido un error durante el registro.",
                           type: "error",
                           position: "bottom",
                           duration: 5000
                        });

                     }else{
                        Vue.$toast.open({
                           message: "El proveedor ha sido registrado exitosamente.",
                           type: "info",
                           position: "bottom",
                           duration: 7500
                        });
                        this.$router.push({name: "providers"});
                     }
                  })
                  .catch((error) => {
                     console.log(`Error: ${error}`);
                  });
            }

            this.loading = false;
         },

         selectAllFeatures(){
            this.selectedFeatures = [...this.features];
            this.allFeaturesSelected = true;
         },

         unselectAllFeatures(){
            this.selectedFeatures = [];
            this.allFeaturesSelected = false;
         },

         newFeatureModalFormSubmit(feature){
            if(feature)this.features.push(feature);
         },

         newFeatureModalFormReset(){
            this.newFeatureModalFormOpen = false;
         },

         clear(){
            this.form.name = "";
            this.form.country = "";
            this.form.city = "";
            this.form.address = "";
            this.form.phone_number = "";
            this.form.email = "";
            this.form.description = "";
            this.unselectAllFeatures();
            this.resetValidation();
         },

         resetValidation(){
            this.labels.name.error = "";
            this.labels.country.error = "";
            this.labels.city.error = ""; 
            this.labels.address.error = "";
            this.labels.phone_number.error = "";
            this.labels.email.error = "";
            this.labels.description.error = "";
            this.formValidated = true;
         },

         async validation(){

            this.nameValidation();
            this.countryValidation();
            this.cityValidation();
            this.addressValidation();
            this.phoneNumberValidation();
            await this.emailValidation();
            this.descriptionValidation();

            this.formValidated = true;

            for(let label in this.labels){
               if(String(this.labels[label].error) !== ""){
                  this.formValidated = false; break;
               }
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

            buffer = validator.maxLength(this.form.name, 80);
            this.labels.name.error = (buffer != null) ? buffer : "";
         },

         countryValidation(){
            
            let buffer;

            buffer = validator.required(this.form.country);
            this.labels.country.error = (buffer != null) ? buffer : "";
            if(buffer != null) return;

            buffer = validator.alpha(this.form.country);
            this.labels.country.error = (buffer != null) ? buffer : "";
            if(buffer != null) return;

            buffer = validator.maxLength(this.form.country, 50);
            this.labels.country.error = (buffer != null) ? buffer : "";
         },

         cityValidation(){
            
            let buffer;

            buffer = validator.required(this.form.city);
            this.labels.city.error = (buffer != null) ? buffer : "";
            if(buffer != null) return;

            buffer = validator.alpha(this.form.city);
            this.labels.city.error = (buffer != null) ? buffer : "";
            if(buffer != null) return;

            buffer = validator.maxLength(this.form.city, 100);
            this.labels.city.error = (buffer != null) ? buffer : "";
         },

         addressValidation(){
            
            let buffer;

            buffer = validator.required(this.form.address);
            this.labels.address.error = (buffer != null) ? buffer : "";
            if(buffer != null) return;

            buffer = validator.maxLength(this.form.address, 80);
            this.labels.address.error = (buffer != null) ? buffer : "";
         },

         phoneNumberValidation(){
            
            let buffer;

            buffer = validator.required(this.form.phone_number);
            this.labels.phone_number.error = (buffer != null) ? buffer : "";
            if(buffer != null) return;

            buffer = validator.numeric(this.form.phone_number);
            this.labels.phone_number.error = (buffer != null) ? buffer : "";
            if(buffer != null) return;

            buffer = validator.minLength(this.form.phone_number, 4);
            this.labels.phone_number.error = (buffer != null) ? buffer : "";
            if(buffer != null) return;

            buffer = validator.maxLength(this.form.phone_number, 20);
            this.labels.phone_number.error = (buffer != null) ? buffer : "";
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

            let response = await axios.get(`provider/email_exists/${this.form.email}`);
            this.labels.email.error = (response.data) ? "Ya existe un proveedor registrado con esta dirección de correo electrónico." : "";
         },

         descriptionValidation(){

            let buffer;

            buffer = validator.maxLength(this.form.description, 1000);
            this.labels.description.error = (buffer != null) ? buffer : "";
         }
      }
   }
</script>
