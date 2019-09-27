<template>
    
  <div class="text-center" >
      
    <v-overlay :value="true">
        <v-progress-circular color="#ff4200" indeterminate size="80"></v-progress-circular>
        <h5>Cargando</h5>
      </v-overlay>
  </div>
</template>
<script>
import { mapState } from 'vuex'
export default {
    data: () => ({
      over: true,
      state: 0,
    }),
    computed: {
        ...mapState(['localStorageLength', 'otherLenght']),
    },

    watch: {
    }, 
    
    
}
</script>