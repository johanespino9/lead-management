<template>
  <div>
     
             
    <v-app v-if="accessToken==null && localStorageLength==0  && (lenghLS==null || otherLenght==null)">
        <Login2></Login2> 
    </v-app>
    <v-app v-if="accessToken!=null && (localStorageLength>0 && localStorageLength<8) && (((lenghLS>0 && lenghLS<8) || (lenghLS==null)) ||  (otherLenght>0 && otherLenght<8 || otherLenght==null))">
      <Charge></Charge>
    </v-app> 
    <v-app v-if="accessToken!=null && (localStorageLength>=8 || lenghLS>=8 || lenghLS2>=8)"> 
      <NavBar></NavBar>
      <!-- <Menu></Menu> -->
      <Content></Content>
      <Footer></Footer>
    </v-app>
    <!-- <RegisterLead></RegisterLead> -->
    <!-- <router-view></router-view> --> 
   
  </div>
</template>

<script>

import NavBar from './components/NavBar';
/* import Menu from './components/Menu'; */
import Content from './components/Content';
import Footer from './components/Footer';
import Login2 from './components/Login2';
import Charge from './components/Charge'
import NotFound from './components/NotFound'

import { mapActions, mapState } from 'vuex'

export default {
  name: 'App',
  components: {
    NavBar,
    /* Menu, */
    Content,
    Footer,
    Login2,
    Charge,
    NotFound,
  },
  data: () => ({
    lenghLS: parseInt(localStorage.getItem('objects')),
    lenghLS2: 0,
    usuario: ''
  }),
  computed: {
    ...mapState(['accessToken', 'localStorageLength', 'otherLenght', 'tipo_usuario']),
    lenght(){
      this.lenghLS = parseInt(localStorage.getItem('objects'))
    },
    lengh2(){
      this.lenghLS = parseInt(this.otherLenght)
    }
  },
  mounted() {
    try {
      var user = JSON.parse(localStorage.getItem('usuario'))
      this.usuario= user.role
    } catch (error) {

    }
  },
 created() {
        /* localStorage.removeItem('token')
        localStorage.removeItem('usuarios')
        localStorage.removeItem('dashboard')
        localStorage.removeItem('leads')
        localStorage.removeItem('hoteles')
        localStorage.removeItem('segmentos')
        localStorage.removeItem('accounts')
        localStorage.removeItem('usuario')
        localStorage.removeItem('objects')
        localStorage.removeItem('categories')
        localStorage.removeItem('branchs')
        localStorage.removeItem('dashjefe')
        localStorage.removeItem('visitas')
        localStorage.removeItem('yearandmonth')
        localStorage.removeItem('leads-user')
        localStorage.removeItem('dashgerente')  */
  },
  destroyed() {
        localStorage.removeItem('token')
        localStorage.removeItem('usuarios')
        localStorage.removeItem('dashboard')
        localStorage.removeItem('leads')
        localStorage.removeItem('hoteles')
        localStorage.removeItem('segmentos')
        localStorage.removeItem('accounts')
        localStorage.removeItem('usuario')
        localStorage.removeItem('objects')
        localStorage.removeItem('categories')
        localStorage.removeItem('branchs')
        localStorage.removeItem('dashjefe')
         localStorage.removeItem('visitas')
         localStorage.removeItem('yearandmonth')
        localStorage.removeItem('leads-user')
        localStorage.removeItem('dashgerente')
  },
  beforeDestroy() {
        localStorage.removeItem('token')
        localStorage.removeItem('usuarios')
        localStorage.removeItem('dashboard')
        localStorage.removeItem('leads')
        localStorage.removeItem('hoteles')
        localStorage.removeItem('segmentos')
        localStorage.removeItem('accounts')
        localStorage.removeItem('usuario')
        localStorage.removeItem('objects')
        localStorage.removeItem('categories')
        localStorage.removeItem('branchs')
        localStorage.removeItem('dashjefe')
        localStorage.removeItem('visitas')
        localStorage.removeItem('yearandmonth')
        localStorage.removeItem('leads-user')
        localStorage.removeItem('dashgerente')
  },

};
</script>
<style >

</style>
