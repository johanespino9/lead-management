<template>
    <div>
        <v-content>
      <v-container
        fluid
      > 
          <v-flex shrink>
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