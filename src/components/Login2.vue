<template>
  <div id="login">
  <br><br><br>
  <v-card
      class="mx-auto"
      :flat="flat"
      :loading="loading"
      :outlined="outlined"
      :elevation="elevation"
      :raised="raised"
      max-width="450"
      :height="height"
    >
      <v-img
        v-if="media"
        class="white--text"
        height="343px"
        src="../assets/casa-andina.png"
      >
      </v-img>  
       <v-form>
        <v-col cols="12">
            <v-text-field color="#ff4200" v-model="email" label="Usuario" required></v-text-field>
            <v-text-field
              color="#ff4200"
              v-model="password"
              :append-icon="show1 ? 'visibility' : 'visibility_off'"
              :type="show1 ? 'text' : 'password'"
              name="input-10-1"
              label="Contraseña"
              hint="At least 8 characters"
              counter
            ></v-text-field>
            <div class="text-center" style="margin-top: 30px;">
              <v-btn color="#000000" class="white--text" @click="login()">Ingresar</v-btn>
            </div>
            <br>
        </v-col>
    </v-form>
    </v-card>
	</div>
</template>

<script>
import axios from 'axios'
import { mapActions } from 'vuex'

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
      ]),
    async login(){
      try {
      var sendData = {
        username: this.email,
        password: this.password
      }
      await axios.post('https://casa-andina.azurewebsites.net/login', sendData)
      .then((res) => { 
        localStorage.setItem('token',res.data.token)
        this.$store.dispatch('verLogin')
        this.$store.dispatch('getHotels')
        this.$store.dispatch('getUsers')
        this.$store.dispatch('getAllLeads')
        this.$store.dispatch('getAccounts')
        this.$store.dispatch('getDashboard')
        this.$store.dispatch('getSegmentos')
        this.$store.dispatch('getManagers')
        this.$store.dispatch('getDataUser')
        this.$store.dispatch('getCategories')
        this.$store.dispatch('getBranch') 
        this.$store.dispatch('getDashJefes') 
        this.$store.dispatch('getVisits')
      })
      } catch (error) { 
          alert('No tienes acceso')
      }
    }
  }
}
</script>
<style scoped>
  .v-input__slider {
    width: 100%;
  }
  #login{
    height: 100%;
    /* background-color: #000000; */
    /* background-image: url('~@/assets/casa-andina-fondo.jpg'); */
    background-image: -webkit-linear-gradient(to right, rgb(34, 34, 34), rgb(68, 68, 68), #3A1C71);
    background-image: linear-gradient(to right, rgb(0, 0, 0), rgb(36, 36, 36), rgb(46, 24, 0));
  }
</style>