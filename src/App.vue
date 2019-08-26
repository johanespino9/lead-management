<template>
  <div>
    <v-app>
      <NavBar></NavBar>
      <Menu></Menu>
      <Content></Content>
      <Footer></Footer>
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

export default {
  name: 'App',
  components: {
    HelloWorld,
    NavBar,
    Menu,
    Content,
    Footer
  },
  data: () => ({
    //
  }),
};
</script>
