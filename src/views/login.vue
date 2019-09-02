<template>
        <div class="container" id='app'>
          <div class="note note--down"><p>{{ note }}</p></div>
          <div class="login">
            <header class="login--header">
              <span>Log In</span>
            </header>
            <section class="login--section">
              <form class='login--form' @submit.prevent='login'>
                <fieldset>
                  <input type="text" placeholder='account' required @focus='inputFocus' />
                  <svg viewbox='0 0 100 1' class='line'>
                    <path class='line--default' d='M0 0 L100 0'></path>
                  </svg>
                </fieldset>
                <fieldset>
                  <input type="password" placeholder='password' @focus='inputFocus' required />
                  <svg viewbox='0 0 100 1' class='line'>
                    <path class='line--default' d='M0 0 L100 0'></path>
                  </svg>
                </fieldset>
                <fieldset>
                  <button type='submit' class='btn'>Login</button>
                </fieldset>
              </form>
              <button @click="getLeads" class='btn'>GET LEADS</button>
            </section>
          </div>
        </div>
</template>
<script>
import axios from 'axios';
import {mapState} from 'vuex'
  export default {
    data(){
      return {
        username : "",
        password : ""
      }
    },
    mounted(){
      console.log(this.accessToken)
    },
    computed:{
      ...mapState(['accessToken'])
    },
    methods: {
      async login() {
        /* const username = this.username 
        const password = this.password
        this.$store.dispatch('login', { username, password }).then(() => this.$router.push('/')) */ 
        
        await axios.post("https://casa-andina.azurewebsites.net/login", { username: "admin", password: 123456})
        .then((response)=> {
          console.log(response.headers)
        })

        if(typeof(Storage) !== undefined){
          console.log("STORAGE DISPONIBLE")
        }else{
          console.log("NO SOPORTA LOCALSTORAGE")
        }
        localStorage.setItem('hola', 'soy UN TOKEN')
        console.log("asda", localStorage.getItem("hola"))

      
        
      },
      getLeads(){
        
      
        var config =  {
          headers: {'Authorization': this.accessToken }
        }
        axios.get("https://casa-andina.azurewebsites.net/user/all", {
          'headers': {
            'Authorization': this.accessToken
          }
        })
        .then((response) => {
          console.log(response.data)
        })
        .catch((error) =>{
          console.log(error)
        })
      }
    }
  }
</script>