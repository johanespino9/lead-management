<template>
  <div>
    <v-app>
      <NavBar></NavBar>
      <Menu></Menu>
      <router-view></router-view>
    </v-app>
      
    
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld';
import NavBar from './components/NavBar';
import Menu from './components/Menu';

export default {
  name: 'App',
  components: {
    HelloWorld,
    NavBar,
    Menu
  },
  data: () => ({
    //
  }),
};
</script>
