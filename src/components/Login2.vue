<template>
  <div>
    <v-container>
      <v-row>
        <v-col cols="4">
          
            <v-text-field v-model="email" label="Usuario" required></v-text-field>
            <v-text-field
              v-model="password"
              :append-icon="show1 ? 'visibility' : 'visibility_off'"
              
              :type="show1 ? 'text' : 'password'"
              name="input-10-1"
              label="Contraseña"
              hint="At least 8 characters"
              counter
            ></v-text-field>

            <v-btn color="success" class="mr-4" @click="login()">Validate</v-btn>
        </v-col>
      </v-row>
    </v-container>
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
      show1: false
    }
  },
  computed: {
  },
  methods: {
      ...mapActions(['verLogin']),
    async login(){
      try {
      var sendData = {
        username: this.email,
        password: this.password
      }
      await axios.post('https://casa-andina.azurewebsites.net/login', sendData)
      .then((res) => { 
        console.log(res.data);
        localStorage.setItem('token',res.data.token)
        this.$store.dispatch('verLogin')
      })
      } catch (error) { 
      }
    }
  }
}
</script>