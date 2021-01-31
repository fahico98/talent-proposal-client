
<template>
   <div class="px-0">

      <div class="m-0 p-0" v-if="profileUser">

         <div class="row m-0 p-0">
            <img :src="correctedImageUrl" alt="Foto de perfil" class="mx-0 px-0 rounded-circle border border-color2" width="100%" height="auto">
         </div>

         <div class="row m-0 p-0 mt-3">
            <p style="font-size: 32px" class="m-0 p-0 fw-light text-color3">{{ profileUser.firstname }}&nbsp;{{ profileUser.lastname }}</p>
         </div>
         
         <div class="row m-0 p-0 mt-2">
            <div class="m-0 p-0 d-flex text-truncate d-inline-flex justify-content-start align-items-center">

               <svg xmlns="http://www.w3.org/2000/svg" width="19" height="19" fill="currentColor" class="text-color3 bi bi-envelope" viewBox="0 0 16 16"><path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V4zm2-1a1 1 0 0 0-1 1v.217l7 4.2 7-4.2V4a1 1 0 0 0-1-1H2zm13 2.383l-4.758 2.855L15 11.114v-5.73zm-.034 6.878L9.271 8.82 8 9.583 6.728 8.82l-5.694 3.44A1 1 0 0 0 2 13h12a1 1 0 0 0 .966-.739zM1 11.114l4.758-2.876L1 5.383v5.73z"/></svg>

               <p style="font-size: 15px" class="m-0 p-0 ms-2 fw-normal text-color4">{{ profileUser.email }}</p>

            </div>
         </div>

         <div class="row m-0 p-0 mt-1">
            <div class="m-0 p-0 d-flex d-inline-flex justify-content-start align-items-center">
               
               <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="text-color3 bi bi-telephone" viewBox="0 0 16 16"><path d="M3.654 1.328a.678.678 0 0 0-1.015-.063L1.605 2.3c-.483.484-.661 1.169-.45 1.77a17.568 17.568 0 0 0 4.168 6.608 17.569 17.569 0 0 0 6.608 4.168c.601.211 1.286.033 1.77-.45l1.034-1.034a.678.678 0 0 0-.063-1.015l-2.307-1.794a.678.678 0 0 0-.58-.122l-2.19.547a1.745 1.745 0 0 1-1.657-.459L5.482 8.062a1.745 1.745 0 0 1-.46-1.657l.548-2.19a.678.678 0 0 0-.122-.58L3.654 1.328zM1.884.511a1.745 1.745 0 0 1 2.612.163L6.29 2.98c.329.423.445.974.315 1.494l-.547 2.19a.678.678 0 0 0 .178.643l2.457 2.457a.678.678 0 0 0 .644.178l2.189-.547a1.745 1.745 0 0 1 1.494.315l2.306 1.794c.829.645.905 1.87.163 2.611l-1.034 1.034c-.74.74-1.846 1.065-2.877.702a18.634 18.634 0 0 1-7.01-4.42 18.634 18.634 0 0 1-4.42-7.009c-.362-1.03-.037-2.137.703-2.877L1.885.511z"/></svg>

               <p style="font-size: 15px" class="m-0 p-0 ms-2 fw-normal text-color4">3229364838</p>
            
            </div>
         </div>

         <div class="row m-0 p-0 mt-1">
            <div class="m-0 p-0 d-flex d-inline-flex justify-content-start align-items-center">
               
               <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="text-color3 bi bi-at" viewBox="0 0 14 14"><path d="M13.106 7.222c0-2.967-2.249-5.032-5.482-5.032-3.35 0-5.646 2.318-5.646 5.702 0 3.493 2.235 5.708 5.762 5.708.862 0 1.689-.123 2.304-.335v-.862c-.43.199-1.354.328-2.29.328-2.926 0-4.813-1.88-4.813-4.798 0-2.844 1.921-4.881 4.594-4.881 2.735 0 4.608 1.688 4.608 4.156 0 1.682-.554 2.769-1.416 2.769-.492 0-.772-.28-.772-.76V5.206H8.923v.834h-.11c-.266-.595-.881-.964-1.6-.964-1.4 0-2.378 1.162-2.378 2.823 0 1.737.957 2.906 2.379 2.906.8 0 1.415-.39 1.709-1.087h.11c.081.67.703 1.148 1.503 1.148 1.572 0 2.57-1.415 2.57-3.643zm-7.177.704c0-1.197.54-1.907 1.456-1.907.93 0 1.524.738 1.524 1.907S8.308 9.84 7.371 9.84c-.895 0-1.442-.725-1.442-1.914z"/></svg>

               <p style="font-size: 15px" class="m-0 p-0 ms-2 fw-normal text-color4">{{ profileUser.username }}</p>
            
            </div>
         </div>

         <div class="row m-0 p-0 mt-1">
            <div class="m-0 p-0 text-truncate d-flex d-inline-flex justify-content-start align-items-center">

               <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="text-color3 bi bi-star" viewBox="0 0 16 16"><path d="M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.523-3.356c.329-.314.158-.888-.283-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767l-3.686 1.894.694-3.957a.565.565 0 0 0-.163-.505L1.71 6.745l4.052-.576a.525.525 0 0 0 .393-.288l1.847-3.658 1.846 3.658a.525.525 0 0 0 .393.288l4.052.575-2.906 2.77a.564.564 0 0 0-.163.506l.694 3.957-3.686-1.894a.503.503 0 0 0-.461 0z"/></svg>

               <p style="font-size: 15px" class="m-0 p-0 ms-2 fw-normal text-color4">Calificaciones: {{ profileUser.review_count }}</p>

            </div>
         </div>

      </div>

      <div class="col-lg-4 d-flex justify-content-center align-items-center" style="height: 200px; width: 100%;" v-else>
         <div class="spinner-border text-color3 m-0 p-0" style="width: 30px; height: 30px;" role="status">
            <span class="visually-hidden">Cargando...</span>
         </div>
      </div>

   </div>
</template>

<script>

   import axios from "axios";
   import { mapGetters } from "vuex";

   export default {

      data(){
         return { profileUser: null }
      },

      computed: {
         
         ...mapGetters({
            user: "auth/user"
         }),

         correctedImageUrl(){
            if(this.profileUser.profile_picture != null){
               return axios.defaults.baseURL.replace("/api", "") + this.profileUser.profile_picture.url.replace("public/", "storage/")
            }else{
               return (this.profileUser.gender == "masculino")
                  ? axios.defaults.baseURL.replace("/api", "") + "storage/avatars/male_avatar.png"
                  : axios.defaults.baseURL.replace("/api", "") + "storage/avatars/female_avatar.png";
            }
         }
      },

      methods: {

         ownProfile(){
            if(this.user) return this.user.username == this.$route.params.username;
         },

         async loadUser(username){
            try{
               let response = await axios.get(`user/show/${username}`);
               return response.data;
            }catch(error){
               this.$router.push({ name: "404" });
            }
         }
      },

      watch: {
         async $route(to, from) {
            if(to.params.username != from.params.username){
               this.profileUser = null;
               this.profileUser = await this.loadUser(to.params.username);
            }
         }
      },

      async created(){
         if(!this.ownProfile()){
            this.profileUser = await this.loadUser(this.$route.params.username);
         }else{
            this.profileUser = this.user;
         }
      }
   }

</script>
