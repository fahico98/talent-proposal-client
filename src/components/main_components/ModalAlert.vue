
<template>
   <div>

      <button hidden type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#modalAlert" ref="modalAlertTrigger">
         modal alert trigger
      </button>

      <div class="modal fade border-color3" id="modalAlert" tabindex="-1" aria-labelledby="modalAlertLabel" aria-hidden="true">
         <div class="modal-dialog">
            <div class="modal-content">

               <div class="modal-header bg-color3">
                  <h5 class="modal-title text-color2" id="modalAlertLabel">{{ title }}</h5>
                  <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
               </div>
               
               <div class="modal-body bg-color1">
                  <p class="text-danger">{{ message }}</p>
               </div>
               
               <div class="modal-footer bg-color1">
                  <button type="button" class="btn btn-color4 text-color2" data-bs-dismiss="modal">Aceptar</button>
               </div>
            
            </div>
         </div>
      </div>

   </div>
</template>

<script>
   
   export default {
      props: {
         message: String,
         title: String
      }
   }

</script>
