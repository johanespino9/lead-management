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
      color="#000000"
    >
      <v-list-item  color="#ff4200">
        <v-list-item-avatar >
          <v-img src="../assets/avatar2.jpg"></v-img>
        </v-list-item-avatar>
        <!-- <v-list-item-title>{{username}}</v-list-item-title>
        <v-list-item-subtitle>chupetin@gmail.com</v-list-item-subtitle> -->
        <v-list-item-content >
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

        <v-list-item color="#ff4200" v-if="role!='Ejecutivo'" to="/dashboard_jefes">       
          <v-list-item-action>
            <v-icon>home</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title> Dashboard Jefes </v-list-item-title>
          </v-list-item-content>     
       </v-list-item>
            <v-list-item color="#ff4200" v-if="role=='Ejecutivo'" to="/dashboard-ejecutivos">
              <v-list-item-action>
                <v-icon>dashboard</v-icon>
              </v-list-item-action>
              <v-list-item-content>
                <v-list-item-title>DashBoard Ejecutivo</v-list-item-title>
              </v-list-item-content>
              </v-list-item>
            <v-list-item color="#ff4200" v-if="role=='Ejecutivo'" to="/register-lead">
              <v-list-item-action>
                <v-icon>event</v-icon>
              </v-list-item-action>
              <v-list-item-content>
            <v-list-item-title>Gestión de Leads</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item color="#ff4200" v-if="role=='Administrador'" to="/register-user">
          <v-list-item-action>
            <v-icon>event</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Gestión de Usuarios</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item color="#ff4200" v-if="role=='Ejecutivo' || role=='Supervisor de Segmento'" to="/register-account">
          <v-list-item-action>
            <v-icon>event</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Gestión de Cuentas</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item color="#ff4200" to="/visits">
          <v-list-item-action>
            <v-icon>notification_important</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Visitas</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item color="#ff4200" to="/profile">
          <v-list-item-action>
            <v-icon>perm_identity</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Mi Perfil</v-list-item-title>
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
          <v-btn color="#ff4200" block @click="CerrarSession()">Logout</v-btn>
        </div>
      </template>
    </v-navigation-drawer>
  </v-card>

    </div>
    
</template>
<script>
import { mapActions, mapState } from 'vuex';
import router from '../router'

export default {
    data: () => ({
      Usuario: {},
      items: 'HOLA',
      drawer: true,
      mini: true,
      email: 'user@casa-andina.com',
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
      console.log(this.role)
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
</style>