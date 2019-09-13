import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {

    token: [],
    username: 'admin',
    password: 123456,
    token: localStorage.getItem('user-token') || '',
    accessToken: localStorage.getItem('access_token'),
    currentUser : {}
  },
  mutations: {
    miToken(state, tokenAction){
      state.token= tokenAction
    }
  },
  actions: {
    async login({commit, state}){   
      await axios.post("https://casa-andina.azurewebsites.net/login", 
      {
          username: state.username,
          password: state.password
      }).then(res => { 
        const token= res.data
        console.log(res)
        console.log(token)
        commit('miToken', token)
      }).catch(error => {
        console.log(error)
      })
   }
  }
})
