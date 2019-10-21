<template>
    <div >
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
    <div id="robotin" style="margin-bottom: 30px; margin-right: 10px; display:scroll;position:fixed; bottom:0px; right:0px;cursor:pointer;max-width:120px;">
  <a href=""> <img style="margin-bottom: 10px;" src="../assets/robotin.gif" alt="robotin"></a>
  
</div>
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