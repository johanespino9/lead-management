<template>
    <div >
    <v-content>   
      <v-container
        fluid
        class="mt-12"
        
      > 
          <v-flex shrink class="mt-4">
              <router-view> 
              </router-view>
          </v-flex>
      </v-container>

    </v-content>
    

    </div>

</template>
<script>
import TableDash from './TableDash';
import RegisterLead from './RegisterLead';



export default {
    components:{
        TableDash,
        RegisterLead,

    }
    
}
</script>
<style>
</style>