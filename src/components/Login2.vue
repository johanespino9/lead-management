<template>
  <div id="login" class="container-fluid">
  <br><br><br>
  <div class="container "> 
      <div id="card">
      <v-card
      id="card"
      class="card mx-auto"
      :flat="flat"
      :loading="loading"
      :outlined="outlined"
      :elevation="elevation"
      :raised="raised"
      max-width="450"
      :height="height"
    >
      <!-- <v-img
        v-if="media"
        class="img-fluid white-text"
        height="343px"
        src="../assets/casa-andina.png"
      >
      </v-img>   -->
      <img class="img-fluid white-text"
        height="343px"
        src="../assets/casa-andina.png">
       <v-form>
        <v-col cols="12">
            <v-text-field class="input" id="username-leadm" v-on:keyup="enterLogin" color="#d69c4f" v-model="email" label="Usuario" required></v-text-field>
            <v-text-field
              id="password"
              class="input"
              v-on:keyup="enterLogin" 
              color="#d69c4f"
              v-model="password"
              :append-icon="show1 ? 'visibility' : 'visibility_off'"
              :type="show1 ? 'text' : 'password'"
              name="input-10-1"
              label="Contraseña"
              hint="At least 8 characters"
               @click:append="show1 = !show1"
              counter
            ></v-text-field>
            <div class="text-center" style="margin-top: 30px;">
              <v-btn id="btn_ingresar" color="#000000" class="white--text" @click="Ingresar()">Ingresar</v-btn>
            </div>
            <br>
        </v-col>
    </v-form>
    </v-card>
    </div>
  </div>
  

    

	</div>
</template>

<script>
import axios from 'axios'
import { mapActions, mapState } from 'vuex'

export default {
  data(){
    return{
      password: '',
      email: '',
      show1: false,
      flat: false,
      media: true,
      loading: false,
      outlined: false,
      elevation: undefined,
      raised: false,
      height: undefined,

    }
  },
  computed: {
    ...mapState(['linkServer'])
  },
  methods: {
      ...mapActions([
        'verLogin',
        'getHotels',
        'getDashboard',
        'getAllLeads',
        'getUsers',
        'getManagers',
        'getDashboard',
        'redirigir',
        'getTodo',
      ]),
    Ingresar(){
      if(this.email.length==0 || this.password.length==0) {
        swal ( "Rellene todos los campos" ,  "Debes rellenar todos los campos" ,  "error" )
      } else{
        this.login()
        
      }
      
    },
    async login(){
      try {
      this.bloquearIngreso()
      var sendData = {
        username: this.email,
        password: this.password
      }
      await axios.post(this.linkServer+'/login', sendData)
      .then((res) => { 
        localStorage.setItem('token',res.data.token)
        this.$store.dispatch('verLogin')
        this.$store.dispatch('getDashJefes')
        this.$store.dispatch('getHotels')
        this.$store.dispatch('getDashboard')
        this.$store.dispatch('getDataUser')
        this.$store.dispatch('getDashGerentes')
        this.$store.dispatch('getUsers')
        this.$store.dispatch('getAccounts')
        this.$store.dispatch('getSegmentos')
        this.$store.dispatch('getManagers')
        this.$store.dispatch('getAllLeads') 
        this.$store.dispatch('getCategories')
        this.$store.dispatch('getBranch') 
        this.$store.dispatch('getVisits')
      })
      } catch (error) {
          console.log(error) 
          swal ( "Usuario y/o contraseña incorrectos" ,  `${error}` ,  "error" )
          this.desbloquearIngreso()
      }
    },
    enterLogin: function(e) {
      if (e.keyCode === 13) {
        this.Ingresar()
      }      
    },
    bloquearIngreso(){
      let username = document.getElementById('username-leadm')
      let password = document.getElementById('password')
      let btn = document.getElementById('btn_ingresar')
      username.disabled = true
      password.disabled = true
      btn.disabled = true
    },
    desbloquearIngreso(){
      let username = document.getElementById('username-leadm')
      let password = document.getElementById('password')
      let btn = document.getElementById('btn_ingresar')
      username.disabled = false
      password.disabled = false
      btn.disabled = false
    }
  }
}
</script>
<style scoped>
  #login{
    width: 100%;
    height: 100%;
    /* background-color: #000000; */
    /* background-image: url('~@/assets/casa-andina-fondo.jpg'); */
    background-image: -webkit-linear-gradient(to right, rgb(34, 34, 34), rgb(68, 68, 68), #3A1C71);
    background-image: linear-gradient(to right, rgb(0, 0, 0), rgb(36, 36, 36), rgb(46, 24, 0));
  }

  .card{
		border:1px solid #808080;
		padding:5px;
	}
  .img-fluid {
  display: block;
  max-width: 100%;
  height: auto;
}

 
</style>