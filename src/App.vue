<template>
  <div>
    <v-app v-if="accessToken==null">
        <Login2></Login2> 
    </v-app>
    <v-app v-if="accessToken!=null" > 
      <NavBar></NavBar>
      <Menu></Menu>
      <Content></Content>
      <Footer></Footer> 
      <!-- <RegisterLead></RegisterLead> -->
      <!-- <router-view></router-view> --> 
    </v-app>
   
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld';
import NavBar from './components/NavBar';
import Menu from './components/Menu';
import Content from './components/Content';
import Footer from './components/Footer';
import Login from './components/Login';
import Login2 from './components/Login2';

import { mapActions, mapState } from 'vuex'

export default {
  name: 'App',
  components: {
    HelloWorld,
    NavBar,
    Menu,
    Content,
    Footer,
    Login,
    Login2
  },
  data: () => ({ 

  }),
  computed: {
    ...mapState(['accessToken'])
  },
  methods: {
  },
  created() {
    console.log(localStorage.getItem('token'))
  },
};
</script>
