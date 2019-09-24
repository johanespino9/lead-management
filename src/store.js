import Vue from 'vue'
import axios from 'axios'
import Vuex from 'vuex'
import router2 from './views/router'
import router from './router'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    accessToken: localStorage.getItem('token'),
    localStorageLength: 0,
    otherLenght: localStorage.getItem('objects'),
    tipo_usuario: '',
    status: false,
    currentUser : {},
    username:'robval96',
    roleid: 1,
    Dashboard:[],
    Users:[],
    Hoteles:[],
    Accounts: [],
    AllLeads: [],
    Segmentos:[],
    Managers: [],
    User:{}
  },
  mutations: {
    Login(state, LoginAction){
      state.login = LoginAction
    },
    localStorageLength(state, localSAction){
      state.localStorageLength += localSAction
    },
    Status(state, statusAction){
      state.status = statusAction
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
    },
    Managers(state, managersAction){
      state.Managers = managersAction
    },
    User(state, userAction){
      state.User = userAction
    },
    Dashboard(state, dashAction){
      state.Dashboard = dashAction
    },
    tipoUser(state, tuserAction){
      state.tipo_usuario = tuserAction
    }
  },
  actions: {
    verLogin(){
        const token= localStorage.getItem('token')
        this.commit('Token', token)
        this.commit('localStorageLength', 1)
        localStorage.setItem('objects', this.state.localStorageLength)
    },
    Logout({state, commit}){
       //Remover los items del localStorage
      localStorage.removeItem('token')
      localStorage.removeItem('usuarios')
      localStorage.removeItem('dashboard')
      localStorage.removeItem('leads')
      localStorage.removeItem('hoteles')
      localStorage.removeItem('segmentos')
      localStorage.removeItem('accounts')
      localStorage.removeItem('usuario')
      localStorage.removeItem('objects')
      commit('Token', null)
      commit('localStorageLength', -8)
      state.localStorageLength = 0
      window.location.href = '/'
    },
    //OBTENIENDO Dashboadr DE UN USUARIO
    /* async getDashboard({state, commit}) {
      let config = {
        headers: {
          'Authorization': 'Bearer ' + state.accessToken
        }
      }
      let datos = await axios.get(
        "https://casa-andina.azurewebsites.net/"+state.username+"/dashboard", config
      );
      commit('Dashboard', datos.data)
      
    } */
    //OBTENIENDO HOTELES
    async getHotels({state,commit}) {
      let config = {
        headers: {
          'Authorization': 'Bearer ' + state.accessToken
        }
      }
      await axios.get('https://casa-andina.azurewebsites.net/hotels', config)
      .then(response =>{
      commit('Hoteles', response.data)
      localStorage.setItem('hoteles', JSON.stringify(response.data))
      commit('localStorageLength', 1)
      localStorage.setItem('objects', state.localStorageLength)
      }).catch(error =>{
        console.log(error)
        alert('hotels')
        localStorage.removeItem('token')
        localStorage.removeItem('usuarios')
        localStorage.removeItem('dashboard')
        localStorage.removeItem('leads')
        localStorage.removeItem('hoteles')
        localStorage.removeItem('segmentos')
        localStorage.removeItem('accounts')
        localStorage.removeItem('usuario')
        localStorage.removeItem('objects')
        commit('Token', null)
        commit('localStorageLength', -8)
        state.localStorageLength = 0
        window.location.href = '/'
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
        localStorage.setItem('leads', JSON.stringify(res.data))
        commit('localStorageLength', 1)
        localStorage.setItem('objects', state.localStorageLength)
      }).catch(error =>{
        console.log(error)
        alert('leads')
        localStorage.removeItem('token')
        localStorage.removeItem('usuarios')
        localStorage.removeItem('dashboard')
        localStorage.removeItem('leads')
        localStorage.removeItem('hoteles')
        localStorage.removeItem('segmentos')
        localStorage.removeItem('accounts')
        localStorage.removeItem('usuario')
        localStorage.removeItem('objects')
        commit('Token', null)
        commit('localStorageLength', -8)
        state.localStorageLength = 0
        window.location.href = '/'
      })
    },

    //Obteniendo cuentas
    async getAccounts({state, commit}) {
      let config = {
        headers: {
          'Authorization': 'Bearer ' + state.accessToken
        }
        }
      await axios.get('https://casa-andina.azurewebsites.net/user/accounts', config)
      .then((response) => {
        commit('Accounts', response.data)
        localStorage.setItem('accounts', JSON.stringify(response.data))
        commit('localStorageLength', 1)
        localStorage.setItem('objects', state.localStorageLength)
      })
      .catch((error) => {
        alert('error en get accounts')
        console.log(error)
        localStorage.removeItem('token')
        localStorage.removeItem('usuarios')
        localStorage.removeItem('dashboard')
        localStorage.removeItem('leads')
        localStorage.removeItem('hoteles')
        localStorage.removeItem('segmentos')
        localStorage.removeItem('accounts')
        localStorage.removeItem('usuario')
        localStorage.removeItem('objects')
        commit('Token', null)
        commit('localStorageLength', -8)
        state.localStorageLength = 0
        window.location.href = '/'
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
        localStorage.setItem('usuarios', JSON.stringify(response.data))
        commit('localStorageLength', 1)
        localStorage.setItem('objects', state.localStorageLength)
      })
      .catch((error) => {
        console.log(error)
        alert('users')
        localStorage.removeItem('token')
        localStorage.removeItem('usuarios')
        localStorage.removeItem('dashboard')
        localStorage.removeItem('leads')
        localStorage.removeItem('hoteles')
        localStorage.removeItem('segmentos')
        localStorage.removeItem('accounts')
        localStorage.removeItem('usuario')
        localStorage.removeItem('objects')
        commit('Token', null)
        commit('localStorageLength', -8)
        state.localStorageLength = 0
        window.location.href = '/'
      })
    },
  
    // Obteniendo Manager
    async getManagers({state, commit}){
      let config = {
        headers: {
          'Authorization': 'Bearer ' + state.accessToken
        }
      }
      // Supersivor = 1 +1 = 2
      //let id = this.rol.indexOf(this.editedItem.role).toString()
      //console.log('SIN + 1', id)
      let url = 'https://casa-andina.azurewebsites.net/role/'+state.roleid+'/manager'
      //console.log('ID',id)
      console.log('URL', url)
      await axios.get(url, config)
      .then((response) => {
        console.log('Managers',response.data)
        commit('Managers', response.data)
      })
      .catch((error) => {
        console.log(error)
        alert('managers')
        /* localStorage.removeItem('token')
        location.reload(); */
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
        commit('Segmentos', res.data)
        localStorage.setItem('segmentos', JSON.stringify(res.data))
        commit('localStorageLength', 1)
        localStorage.setItem('objects', state.localStorageLength)
      })
      .catch((error) => {
        alert('segmentos')
        console.log(error)
        localStorage.removeItem('token')
        localStorage.removeItem('usuarios')
        localStorage.removeItem('dashboard')
        localStorage.removeItem('leads')
        localStorage.removeItem('hoteles')
        localStorage.removeItem('segmentos')
        localStorage.removeItem('accounts')
        localStorage.removeItem('usuario')
        localStorage.removeItem('objects')
        commit('Token', null)
        commit('localStorageLength', -8)
        state.localStorageLength = 0
        window.location.href = '/'
      })
    },
    //Obteniendo datos del username
    async getDataUser({state, commit}){
      try {    
      let config = {
        headers: {
          'Authorization': 'Bearer ' + state.accessToken
        }
      }
      let url = 'https://casa-andina.azurewebsites.net/user'
      await axios.get(url , config)
      .then((res) => {
        localStorage.setItem('usuario', JSON.stringify(res.data))
        commit('User', res.data)
        commit('localStorageLength', 1)
        localStorage.setItem('objects', state.localStorageLength)
        var user = JSON.parse(localStorage.getItem('usuario'))
        commit('tipoUser', user.role)
        if(user.role =='Ejecutivo'){
          router.push({path: '/dashboard-ejecutivos', name: 'dashboard-ejecutivos',})
        }else{
          router.push({path: '/dashboard_jefes', name: 'dashboard_jefes'})
        }
      })
      .catch((error) => {
        console.log('Hubo un error', error)
        localStorage.removeItem('token')
        localStorage.removeItem('usuarios')
        localStorage.removeItem('dashboard')
        localStorage.removeItem('leads')
        localStorage.removeItem('hoteles')
        localStorage.removeItem('segmentos')
        localStorage.removeItem('accounts')
        localStorage.removeItem('usuario')
        localStorage.removeItem('objects')
        commit('Token', null)
        commit('localStorageLength', -8)
        state.localStorageLength = 0
        window.location.href = '/'
      })
    } catch (error) {
         alert('datauser')
        console.log('Hubo un error')
    }
    },
    //OBETENIENDO DATOS INICIALES PARA EL DASHBOARD
    async getDashboard({state, commit}){
      var datos = {
    		"hotel": "[Seleccionar todos]",
    		"month": 0,
    		"year": 2019
      }
      let config = {
        headers: {
          'Authorization': 'Bearer ' + state.accessToken
        }
      }
      let url = 'https://casa-andina.azurewebsites.net/user/dashboard'
      await axios.post(url, datos, config)
      .then((res) => {
        localStorage.setItem('dashboard', JSON.stringify(res.data))
        commit('Dashboard', res.data)
        commit('localStorageLength', 1)
        localStorage.setItem('objects', state.localStorageLength)
      })
      .catch((error) => {
        alert('error en Dash', error)
        console.log(error)
        localStorage.removeItem('token')
        localStorage.removeItem('usuarios')
        localStorage.removeItem('dashboard')
        localStorage.removeItem('leads')
        localStorage.removeItem('hoteles')
        localStorage.removeItem('segmentos')
        localStorage.removeItem('accounts')
        localStorage.removeItem('usuario')
        localStorage.removeItem('objects')
        commit('Token', null)
        commit('localStorageLength', -8)
        state.localStorageLength = 0
        window.location.href = '/'
      })
    },
    //OBTENIENDO EL ESTADO DEL TOKEN
    async stateToken({state, commit}){
      let config = {
        headers: {
          'Authorization': 'Bearer ' + state.accessToken
        }
      }
      let url = 'https://casa-andina.azurewebsites.net/user/exist_token'
      await axios.get(url, config)
      .then(response =>{
        console.log('Aun hay conexión', response.data)
      })
      .catch(error => {
        alert('El token expiro')
        console.log('Token expirado', error)
        localStorage.removeItem('token')
        localStorage.removeItem('usuarios')
        localStorage.removeItem('dashboard')
        localStorage.removeItem('leads')
        localStorage.removeItem('hoteles')
        localStorage.removeItem('segmentos')
        localStorage.removeItem('accounts')
        localStorage.removeItem('usuario')
        localStorage.removeItem('objects')
        commit('Token', null)
        commit('localStorageLength', -8)
        state.localStorageLength = 0
        window.location.href = '/'
      })
    }    

 
   
  
    

  
  }
})
