<template>
  <div>
    <h2>Login Page</h2>
    <form >
      <div>
          <input  type="text" placeholder="Username" v-model="username">
      </div>
      <div>
          <input placeholder="Password" type="password" v-model="password">
      </div>
      <div>
     <button type="submit" @click="milogin()">Register</button>
      </div>
    </form>
    <br>

    <div>
    </div>
  </div>
</template>
<script>
import {mapState, mapActions} from 'vuex'
  export default {   
    data(){
      return {
        ...mapState(['token']),  
        username : "",
        password : "",
      }
    },
    methods: {
      ...mapActions(['login']),
      milogin(){
          this.$store.dispatch('login');
      }
    
  }
  }
</script>