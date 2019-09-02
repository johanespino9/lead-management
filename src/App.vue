<template>
  <div>
    <v-app>
      <!-- <NavBar></NavBar>
      <Menu></Menu>
      <Content></Content>
      <Footer></Footer> -->

      <!-- <RegisterLead></RegisterLead> -->
      <!-- <router-view></router-view> -->
      <Login></Login>
      <br>
      <br>
      
      <!-- <Session></Session> -->
    </v-app>
      
    
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld';
import NavBar from './components/NavBar';
import Menu from './components/Menu';
import Content from './components/Content';
import Footer from './components/Footer';
import RegisterLead from './components/RegisterLead';
import Login from './views/Login'
import Session from './views/Session'

export default {
  name: 'App',
  components: {
    HelloWorld,
    NavBar,
    Menu,
    Content,
    Footer,
    RegisterLead,
    Login,
    Session
  },
  data: () => ({
    //
  }),
};
</script>
