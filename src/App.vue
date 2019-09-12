<template>
  <div>
    <v-app>
        <NavBar></NavBar>
      <Menu></Menu>
      <Content></Content>
      <Footer></Footer>  
      
      
      <!-- <RegisterLead></RegisterLead> -->
      <!-- <router-view></router-view> -->
    </v-app>
    <router-link to="./views/login">Login</router-link>
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld';
import NavBar from './components/NavBar';
import Menu from './components/Menu';
import Content from './components/Content';
import Footer from './components/Footer';
import Login from './components/Login';

export default {
  name: 'App',
  components: {
    HelloWorld,
    NavBar,
    Menu,
    Content,
    Footer,
    Login
    
  },
  data: () => ({
    logged: false
  }),
};
</script>
