<template>
     <!-- MENU DE SUPERVISORES -->
    <div> 
    <v-card >
    <v-navigation-drawer
      app
      clipped
      v-model="drawer"
      :mini-variant.sync="mini"
      permanent
      dark
    >
      <v-list-item>
        <v-list-item-avatar>
          <v-img src="../assets/profile.png"></v-img>
        </v-list-item-avatar>
        <!-- <v-list-item-title>{{username}}</v-list-item-title>
        <v-list-item-subtitle>chupetin@gmail.com</v-list-item-subtitle> -->
        <v-list-item-content>
            <v-list-item-title >{{usern}}</v-list-item-title>
            <v-list-item-subtitle id="subtitle">{{email}}</v-list-item-subtitle>
          </v-list-item-content>
        <v-btn
          icon
          @click.stop="mini = !mini"
        >
          <v-icon>mdi-chevron-left</v-icon>
        </v-btn>
      </v-list-item>
      <v-divider></v-divider>
      <v-list dense>

        <v-list-item-group >

        <v-list-item v-if="role!='Ejecutivo'" to="/boss-dashboard-casa-a">       
          <v-list-item-action>
            <v-icon>home</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title> Dashboard Jefes </v-list-item-title>
          </v-list-item-content>     
       </v-list-item>
            <v-list-item v-if="role!='Ejecutivo'" to="/tabledash">
              <v-list-item-action>
                <v-icon>dashboard</v-icon>
              </v-list-item-action>
              <v-list-item-content>
                <v-list-item-title>DashBoard Ejecutivo</v-list-item-title>
              </v-list-item-content>
              </v-list-item>
            <v-list-item v-if="role!='Ejecutivo'" to="/registerlead">
              <v-list-item-action>
                <v-icon>event</v-icon>
              </v-list-item-action>
              <v-list-item-content>
            <v-list-item-title>Gestión de Leads</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item v-if="role!='Administrador'" to="/registeruser">
          <v-list-item-action>
            <v-icon>event</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Gestión de Usuarios</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item v-if="role!='Ejecutivo'" to="/registeraccount">
          <v-list-item-action>
            <v-icon>event</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Gestión de Cuentas</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <!-- <v-list-item to="">
          <v-list-item-action>
            <v-icon>settings</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Settings</v-list-item-title>
          </v-list-item-content>
        </v-list-item>  -->

        </v-list-item-group>

      </v-list>
      <template v-slot:append>
        <div class="pa-2">
          <v-btn block @click="CerrarSession()">Logout</v-btn>
        </div>
      </template>
    </v-navigation-drawer>
  </v-card>

    </div>
    
</template>
<script>
import { mapActions, mapState } from 'vuex';

export default {
    data: () => ({
      Usuario: {},
      items: 'HOLA',
      drawer: true,
      mini: true,
      email: 'chupetin@gmail.com',
      usern:'',
      role:''
    }),
    computed: {
      ...mapState(['username', 'User'])
    },
    methods: {
      ...mapActions(['Logout']),
      CerrarSession(){
        this.Logout()
      }
    },
   /* mounted(){
    try {
      this.Usuario = JSON.parse(localStorage.getItem('usuario'))
      console.log(this.Usuario)
      console.log(this.User)
      this.usern = this.Usuario.username
      this.email = this.Usuario.email
      this.role = this.Usuario.role
      
    } catch (error) {
      console.log('Hubo un error')
    }
  } */
  created() {
    try {
      this.Usuario = JSON.parse(localStorage.getItem('usuario'))
      this.usern = this.Usuario.username
      this.email = this.Usuario.email
      this.role = this.Usuario.role   

    } catch (error) {
      console.log('Hubo un error')
    }
  },
}
</script>
<style>
#subtitle{
  font-size: 12px;
}
.title{
  font-size: 8px;

}
</style>