
<template>
   <nav class="navbar navbar-expand-lg navbar-light bg-color3">
      <div class="container d-flex justify-content-between">

         <a class="navbar-brand d-flex align-items-center" href="#">
            <img src="@/assets/icons/television.svg" width="40" alt="Icon"><span class="fs-3 fw-bold text-color2 ms-1">Industries</span>
         </a>
         
         <div v-if="authenticated">
            <ul class="navbar-nav me-auto mb-lg-0">
               
               <li class="nav-item">
                  <router-link class="nav-link active text-color2" :to="{name: 'user_profile', params: { username: user.username }}"><b>{{ user.username }}</b></router-link>
               </li>

               <li class="nav-item">
                  <router-link class="nav-link active text-color2" :to="{name: 'providers'}">Proveedores</router-link>
               </li>
               
               <li class="nav-item">
                  <a class="nav-link active text-color2" href="" @click.prevent="logout">Cerrar sesión</a>
               </li>

            </ul>
         </div>

         <div v-else>
            <ul class="navbar-nav me-auto mb-lg-0">
               <li class="nav-item">
                  <router-link class="nav-link active text-color2" :to="{name: 'login'}">Iniciar sesión</router-link>
               </li>
               <li class="nav-item">
                  <router-link class="nav-link active text-color2" :to="{name: 'users_registration'}">Registrarse</router-link>
               </li>
               <li class="nav-item">
                  <router-link class="nav-link active text-color2" :to="{name: 'home'}">Inicio</router-link>
               </li>
            </ul>
         </div>

      </div>
   </nav>
</template>

<script>

   import { mapGetters, mapActions } from "vuex";

   export default {

      computed: {
         
         ...mapGetters({
            authenticated: "auth/authenticated",
            user: "auth/user"
         })
      },

      methods: {

         ...mapActions({
            logoutAction: "auth/logout"
         }),

         logout(){
            this.logoutAction()
               .then(() => {
                  this.$router.push({name: "home"});
               });
         }
      }
   }

</script>
