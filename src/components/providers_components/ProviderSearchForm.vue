
<template>
   <div>
      
      <p class="fs-4 text-color3 m-0">Proveedores</p>
      <p class="text-color4 m-0">Puede realizar busquedas de proveedores según su nombre, país, ciudad y tambien por puntaje.</p>

      <form class="container-flex mt-4" @submit.prevent="submit">

         <div class="row">

            <div class="col-lg-4 pe-1">
               <input type="text" class="form-control ph-color3 text-color3" :placeholder="placeholderSelected" v-model="value">
               <p :class="formValidated ? 'text-muted' : 'text-danger'" class="mt-1" style="font-size: 13px">{{ labelSelected }}</p>
            </div>

            <div class="col-lg-5 px-1">
               <select class="form-select text-color3" v-model="column" @change.prevent="selectorChanged">
                  <option value="name" selected>Nombre</option>
                  <option value="country">País</option>
                  <option value="city">Ciudad</option>
                  <option value="min_general_score">Calificación mínima</option>
                  <option value="max_general_score">Calificación máxima</option>
               </select>
               <p class="text-muted mt-1" style="font-size: 13px">Seleccione el atributo por medio del cual desea filtrar los proveedores.</p>
            </div>

            <div class="col-lg-1 px-1">
               <button type="submit" style="width: 100%" class="btn btn-color3">Buscar</button>
            </div>

            <div class="col-lg-1 px-1">
               <button type="button" style="width: 100%" class="btn btn-color4" @click.prevent="reset">Reiniciar</button>
            </div>
         
         </div>

      </form>

   </div>
</template>

<script>

   const alphaRegex = /^[ ñÑ.a-zA-Záéíóú]*$/;
   const numericRegex = /^-?\d+\.?\d{0,2}$/;
   
   export default {

      data(){
         return {
            column: "name",
            value: "",
            placeholders: {
               name: "Nombre",
               country: "País",
               city: "Ciudad",
               general_score: "Calificación"
            },
            labels: {
               name: "Ingrese el nombre del proveedor.",
               city: "Ingrese el nombre de la ciudad del proveedor.",
               country: "Ingrese el nombre del país del proveedor.",
               min_general_score: "Ingrese la calificación mínima del proveedor.",
               max_general_score: "Ingrese la calificación máxima del proveedor.",
            },
            formValidated: true,
            errorLabel: ""
         }
      },

      methods: {

         submit(){
            this.validate();
            if(this.formValidated) this.$emit("search", { column: this.column, value: this.value });
         },

         validate(){
            if(this.column == "name" || this.column == "country" || this.column == "city"){
               if(!alphaRegex.test(String(this.value).trim())){
                  this.formValidated = false;
                  this.errorLabel = "Este campo solo admite caracteres alfabéticos.";
               }else{
                  this.formValidated = true;
                  this.errorLabel = "";
               }
            }else{
               let num = parseFloat(this.value);
               if(!numericRegex.test(String(this.value).trim())){
                  this.formValidated = false;
                  this.errorLabel = "No se permiten mas de dos cifras decimales.";
               }else if(num < 0 || num > 5){
                  this.formValidated = false;
                  this.errorLabel = "Las calificaciones deben estar en el intervalo [0, 5].";
               }else{
                  this.formValidated = true;
                  this.errorLabel = "";
               }
            }
         },

         reset(){
            this.column = "name";
            this.value = "";
            this.errorLabel = "";
            this.formValidated = true;
            this.$emit("reset");
         },

         selectorChanged(){
            this.errorLabel = "";
            this.formValidated = true;
            this.value = "";
         }
      },

      computed: {

         labelSelected(){
            if(!this.formValidated){
               return this.errorLabel;
            }else if(this.column == "name"){
               return this.labels.name;
            }else if(this.column == "country"){
               return this.labels.country;
            }else if(this.column == "city"){
               return this.labels.city;
            }else if(this.column == "min_general_score"){
               return this.labels.min_general_score;
            }else{
               return this.labels.max_general_score;
            }
         },

         placeholderSelected(){
            if(this.column == "name"){
               return this.placeholders.name;
            }else if(this.column == "country"){
               return this.placeholders.country;
            }else if(this.column == "city"){
               return this.placeholders.city;
            }else{
               return this.placeholders.general_score;
            }
         }
      }
   }
</script>
