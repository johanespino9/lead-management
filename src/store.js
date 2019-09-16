import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    accessToken: localStorage.getItem('token'),
    currentUser : {},
  },
  mutations: {
    Login(state, LoginAction){
      state.login = LoginAction
    },
    Menu(state, menuAction){
      state.menu = menuAction
    },
    Token(state, tokenAction){
      state.accessToken = tokenAction
    }
  },
  actions: {
    verLogin(){
        const token= localStorage.getItem('token')
        this.commit('Token', token)     
    },
    Logout(){
      localStorage.removeItem('token')
      this.commit('Token', null) 
      window.location.href = '/login'
    }
    
  }
})
