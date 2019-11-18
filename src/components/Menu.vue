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
      <v-list-item  color="#d69c4f">
        <v-list-item-avatar >
          <!-- <v-img src="../assets/avatar2.jpg"></v-img> -->
          <img
             src="https://cdn.vuetifyjs.com/images/john.jpg"
             alt="John"
          >
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

        <v-list-item color="#d69c4f" v-if="role=='Supervisor de Segmento'" to="/dashboard_jefes">       
          <v-list-item-action>
            <v-icon>dashboard</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title> Dashboard Jefes </v-list-item-title>
          </v-list-item-content>     
       </v-list-item>
       <v-list-item color="#d69c4f" v-if="role!='Ejecutivo' && role!='Supervisor de Segmento'" to="/dashboard_gerentes">       
          <v-list-item-action>
            <v-icon>dashboard</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title> Dashboard Jefes </v-list-item-title>
          </v-list-item-content>     
       </v-list-item>
            <v-list-item color="#d69c4f" v-if="role=='Ejecutivo'" to="/dashboard-ejecutivos">
              <v-list-item-action>
                <v-icon>dashboard</v-icon>
              </v-list-item-action>
              <v-list-item-content>
                <v-list-item-title>DashBoard Ejecutivo</v-list-item-title>
              </v-list-item-content>
              </v-list-item>
            <v-list-item color="#d69c4f" v-if="role=='Ejecutivo'" to="/register-lead">
              <v-list-item-action>
                <v-icon>mdi-briefcase-plus-outline</v-icon>
              </v-list-item-action>
              <v-list-item-content>
            <v-list-item-title>Gestión de Leads</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item color="#d69c4f" v-if="role=='Administrador'" to="/register-user">
          <v-list-item-action>
            <v-icon>mdi-account-plus</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Gestión de Usuarios</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item color="#d69c4f" v-if="role=='Administrador'"  to="/register-hotel">
          <v-list-item-action>
            <v-icon>mdi-briefcase-plus-outline</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Gestión de Hoteles</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item color="#d69c4f" v-if="role=='Ejecutivo' || role=='Supervisor de Segmento'" to="/register-account">
          <v-list-item-action>
            <v-icon>mdi-briefcase-plus-outline</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Gestión de Cuentas</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item v-if="role=='Ejecutivo' && groupS != 'Eventos'" color="#d69c4f" to="/visits">
          <v-list-item-action>
            <v-icon>mdi-calendar-edit</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Gestión de Visitas</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item color="#d69c4f" to="/profile">
          <v-list-item-action>
            <v-icon>perm_identity</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Mi Perfil</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        
        <div id="robotin" style="margin-bottom: 30px; margin-right: 10px; display:scroll;position:fixed; bottom:0px; left:55px;cursor:pointer;max-width:120px;">
          <a  @click="abreModalSugestion()"> <img style="margin-bottom: 10px;" src="../assets/robotin.gif" alt="robotin"></a>
        </div>
        
        <!-- <v-list-item to="">
          <v-list-item-action>
            <v-icon>settings</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Settings</v-list-item-title>
          </v-list-item-content>
        </v-list-item>  -->

        
        

      <v-dialog v-model="dialog" persistent max-width="1200px" hide-overlay transition="dialog-bottom-transition">   
        <v-overlay v-if="dialog==true" > 
               
         <v-card>

                <v-card color="#000000" >
                <v-card-title>
                  <v-list-item two-line>
                    
                    <span class="title font-weight-light" color="#FAFAFA"><h5 style="color: white">Hola {{User.name}}, como puedo ayudarte</h5> </span>
                    <v-list-item-avatar class="mr-0" color="grey darken-3">
                      <v-btn icon dark @click="dialog = false">
                          <v-icon>mdi-close</v-icon>
                      </v-btn>
                    </v-list-item-avatar>
                    <!-- <v-list-item-content class="text-right" style="margin-top:5px">
                      <v-list-item-subtitle> <strong>Hoteles</strong>  </v-list-item-subtitle>
                   </v-list-item-content> -->
                 </v-list-item>
                </v-card-title>
                <div class="position-relative mb-4" style="margin-top:0;">
                    
                </div>
              </v-card>
                <v-list three-line subheader>
                <v-list-item>
                  <v-container justify-center>
                      <div id="div1" class="position-relative mb-4 text-center" style="margin-top:0;">
                        <div id="chart4"></div>
                      </div>
                  </v-container>
                </v-list-item>
                </v-list>
                <v-divider></v-divider>

              

            </v-card>

             </v-overlay>
            </v-dialog>



        </v-list-item-group>

      </v-list>
      <template v-slot:append>
        <div class="pa-2">
          <v-btn color="#d69c4f"  class="black--text" block @click="CerrarSession()">Logout</v-btn>
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
      role:'',
      groupS: '',
      dialog: false,
    }),
    computed: {
      ...mapState(['username', 'User'])
    },
    methods: {
      ...mapActions(['Logout']),
      CerrarSession(){
        this.Logout()
      },
      abreModalSugestion(){
        console.log(this.User)

        this.mini = true
        this.dialog = true
      }
    },
    mounted(){
    try {
      if( Object.keys(this.User).length === 0){
        let user = JSON.parse(localStorage.getItem('usuario'))
        this.$store.commit('User', user)
        this.usern = this.User.username
        this.email = this.User.email
        this.role = this.User.role
        this.groupS = this.User.groupSegment
      }else{
        this.usern = this.User.username
        this.email = this.User.email
        this.role = this.User.role
        this.groupS = this.User.groupSegment
      }
    } catch (error) {
      console.log('Hubo un error')
    }
  },

  updated() {
    /* var user = JSON.parse(localStorage.getItem('usuario'))
    this.$store.commit('User', user) */
    /* console.clear() */
    this.usern = this.User.username
    this.email = this.User.email
    this.role = this.User.role
    this.groupS = this.User.groupSegment

    if(localStorage.length>=8){
        this.$store.dispatch('stateToken')
    }
    console.log(window.location.hash)
    
  },
  /* beforeUpdate() {
    console.log('desde before u')
    this.usern = this.User.username
    this.email = this.User.email
    this.role = this.User.role
  }, */
  /* created() {
    try {
      this.Usuario = JSON.parse(localStorage.getItem('usuario'))
      this.usern = this.Usuario.username
      this.email = this.Usuario.email
      this.role = this.Usuario.role   
      console.log(this.role)
    } catch (error) {
      console.log('Hubo un error')
    }
  }, */ 
}
</script>
<style>
#subtitle{
  font-size: 12px;
}
</style>