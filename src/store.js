import Vue from 'vue'
import axios from 'axios'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    accessToken: localStorage.getItem('token'),
    currentUser : {},
    username:'robval96',
    Dashboard:[],
    Users:[],
    Hoteles:[],
    Accounts: [],
    AllLeads: [],
    Segmentos:[]

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
    },
    Users(state, usersAction){
      state.Users = usersAction
    },
    Dashboard(state, dashActions){
      state.Dashboard = dashActions
    },
    Hoteles(state, hotelsAction){
      state.Hoteles = hotelsAction
    },
    Accounts(state, accountsAction){
      state.Accounts = accountsAction
    },
    AllLeads(state, allleadsaction){
      state.AllLeads = allleadsaction
    },
    Segmentos(state, segmentsAction){
      state.Segmentos = segmentsAction
    }
  },
  actions: {
    verLogin(){
        const token= localStorage.getItem('token')
        this.commit('Token', token)   
    },
    Logout(){
       window.location.href = '/'
      localStorage.removeItem('token')
      this.commit('Token', null)
    },
    //OBTENIENDO Dashboadr DE UN USUARIO
    async getDashboard({state, commit}) {
      let config = {
        headers: {
          'Authorization': 'Bearer ' + state.accessToken
        }
      }
      let datos = await axios.get(
        "https://casa-andina.azurewebsites.net/"+state.username+"/dashboard", config
      );
      commit('Dashboard', datos.data)
      
    },
    //OBTENIENDO HOTELES
    async getHotels({state,commit}) {
      let config = {
        headers: {
          'Authorization': 'Bearer ' + state.accessToken
        }
      }
      let res = await axios.get('https://casa-andina.azurewebsites.net/hotels', config)
      .then(response =>{
      commit('Hoteles', response.data)
      }).catch(error =>{
        console.log(error)
        localStorage.removeItem('token')
      }); 
    },
    // Obteniendo todos los Leads
    async getAllLeads({state, commit}){
      let config = {
        headers: {
          'Authorization': 'Bearer ' + state.accessToken
        }
      }
      axios.get('https://casa-andina.azurewebsites.net/user/leads', config)
      .then((res) => {
        commit('AllLeads', res.data)
      }).catch(error =>{
        console.log(error)
        localStorage.removeItem('token')
        location.reload();
      })
    },

    //Obteniendo cuentas
    async getAccounts({state, commit}) {
      let config = {
        headers: {
          'Authorization': 'Bearer ' + state.accessToken
        }
        }
      await axios.get('https://casa-andina.azurewebsites.net/user/account', config)
      .then((response) => {
        commit('Accounts', response.data)
      })
      .catch((error) => {
        console.log(error)
        localStorage.removeItem('token')
        location.reload();
      }) 
    },

    //Obteniendo Usuarios
    async getUsers({state, commit}){
      let config = {
        headers: {
          'Authorization': 'Bearer ' + state.accessToken
        }
      }
      await axios.get('https://casa-andina.azurewebsites.net/user/all', config)
      .then((response) => {
        commit('Users', response.data)
      })
      .catch((error) => {
        console.log(error)
        localStorage.removeItem('token')
        location.reload();
      })
    },
    // Obteniendo Manager
    async getManager({state, commit}){
      let config = {
        headers: {
          'Authorization': 'Bearer ' + state.accessToken
        }
      }
      // Supersivor = 1 +1 = 2
      //let id = this.rol.indexOf(this.editedItem.role).toString()
      //console.log('SIN + 1', id)
      console.log(this.managerId)
      let url = 'https://casa-andina.azurewebsites.net/user/manager/role/'+this.managerId
      //console.log('ID',id)
      console.log('URL', url)
      await axios.get(url, config)
      .then((response) => {
        console.log(response.data)
        this.supervisors = response.data
        
      })
      .catch((error) => {
        console.log(error)
        localStorage.removeItem('token')
        location.reload();
      })
    },

    //Obteniendo Segmentos
    async getSegmentos({state, commit}){
      let config = {
        headers: {
          'Authorization': 'Bearer ' + state.accessToken
        }
      }
      await axios.get('https://casa-andina.azurewebsites.net/user/segment', config)
      .then((res) => {
        console.log(res.data)
        commit('Segmentos', res.data)
      })
      .catch((error) => {
        console.log(error)
        localStorage.removeItem('token')
        window.location.href = '/'
      })
    }
  
  }
})
