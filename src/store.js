import Vue from 'vue'
import axios from 'axios'
import Vuex from 'vuex'
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
    GSegmentos:[],
    Managers: [],
    User:{},
    //Añadi 3 más
    Branchs:[],
    Categories: [],
    Visits:[],
    DashJefe: {},
    Reasons:[],
    
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
    },
    Branchs(state, branchAction){
      state.Branchs = branchAction
    },
    Categories(state, categoriesAction){
      state.Categories = categoriesAction
    },
    Visits(state, visitsAction){
      state.Visits = visitsAction
    },
    DashJefe(state, dashJAction){
      state.DashJefe = dashJAction
    },
    Reasons(state, reasonsAction){
      state.Reasons = reasonsAction
    }
    
  },
  actions: {
    verLogin(){
        const token= localStorage.getItem('token')
        this.commit('Token', token)
        this.commit('localStorageLength', 2)
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
      localStorage.removeItem('categories')
      localStorage.removeItem('group_segment')
      localStorage.removeItem('branchs')
      localStorage.removeItem('dashjefe')
      localStorage.removeItem('visitas')
      localStorage.removeItem('yearandmonth')
      localStorage.removeItem('leads-user')
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
      await axios.get('https://casa-andina-backend.azurewebsites.net/hotels', config)
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
        localStorage.removeItem('categories')
        localStorage.removeItem('branchs')
        localStorage.removeItem('dashjefe')
        localStorage.removeItem('visitas')
        localStorage.removeItem('yearandmonth')
        localStorage.removeItem('leads-user')
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
      axios.get('https://casa-andina-backend.azurewebsites.net/user/leads', config)
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
        localStorage.removeItem('categories')
        localStorage.removeItem('branchs')
        localStorage.removeItem('dashjefe')
        localStorage.removeItem('visitas')
        localStorage.removeItem('yearandmonth')
        localStorage.removeItem('leads-user')
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
      await axios.get('https://casa-andina-backend.azurewebsites.net/user/accounts', config)
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
        localStorage.removeItem('categories')
        localStorage.removeItem('branchs')
        localStorage.removeItem('dashjefe')
        localStorage.removeItem('visitas')
        localStorage.removeItem('yearandmonth')
        localStorage.removeItem('leads-user')
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
      await axios.get('https://casa-andina-backend.azurewebsites.net/user/all', config)
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
        localStorage.removeItem('categories')
        localStorage.removeItem('branchs')
        localStorage.removeItem('dashjefe')
        localStorage.removeItem('visitas')
        localStorage.removeItem('yearandmonth')
        localStorage.removeItem('leads-user')
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
      let url = 'https://casa-andina-backend.azurewebsites.net/role/'+state.roleid+'/manager'
      //console.log('ID',id)
      await axios.get(url, config)
      .then((response) => {
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
      await axios.get('https://casa-andina-backend.azurewebsites.net/user/segment', config)
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
        localStorage.removeItem('categories')
        localStorage.removeItem('branchs')
        localStorage.removeItem('dashjefe')
        localStorage.removeItem('visitas')
        localStorage.removeItem('yearandmonth')
        localStorage.removeItem('leads-user')
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
      let url = 'https://casa-andina-backend.azurewebsites.net/user'
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
        localStorage.removeItem('categories')
        localStorage.removeItem('branchs')
        localStorage.removeItem('dashjefe')
        localStorage.removeItem('visitas')
        localStorage.removeItem('yearandmonth')
        localStorage.removeItem('leads-user')
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
      let fec = new Date()
      let month = (fec.getMonth() +1) 
      let year = fec.getFullYear()
      var datos = {
    		"hotel": "[Seleccionar todos]",
    		"month": 0,
    		"year": year
      }
      let config = {
        headers: {
          'Authorization': 'Bearer ' + state.accessToken
        }
      }
      let url = 'https://casa-andina-backend.azurewebsites.net/user/dashboard/ejecutivos'
      await axios.post(url, datos, config)
      .then((res) => {
        localStorage.setItem('dashboard', JSON.stringify(res.data))
        commit('Dashboard', res.data)
        if(localStorage.length<15){
          commit('localStorageLength', 1)
        localStorage.setItem('objects', state.localStorageLength)
        }
      })
      .catch((error) => {
        alert('Ocurrio un error cargando el Dashboard', error)
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
        localStorage.removeItem('categories')
        localStorage.removeItem('branchs')
        localStorage.removeItem('dashjefe')
        localStorage.removeItem('visitas')
        localStorage.removeItem('yearandmonth')
        localStorage.removeItem('leads-user')
        commit('Token', null)
        commit('localStorageLength', -8)
        state.localStorageLength = 0
        window.location.href = '/'
      })
    },
    //Obteniendo los branch
    async getBranch({state, commit}){
      let config = {
        headers: {
          'Authorization': 'Bearer ' + state.accessToken
        }
      }
      let url = 'https://casa-andina-backend.azurewebsites.net/branch'
      await axios.get(url, config)
      .then((res) => {
        localStorage.setItem('branchs', JSON.stringify(res.data))
        commit('Branchs', res.data)
        /* commit('localStorageLength', 1)
        localStorage.setItem('objects', state.localStorageLength) */
      })
      .catch((error) => {
        console.log('error obteniendo Branchs', error)
        /* console.log(error)
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
        commit('Token', null)
        commit('localStorageLength', -8)
        state.localStorageLength = 0
        window.location.href = '/' */
      })
    },

    //Obteniendo las categorias
    async getCategories({state, commit}){
      let config = {
        headers: {
          'Authorization': 'Bearer ' + state.accessToken
        }
      }
      let url = 'https://casa-andina-backend.azurewebsites.net/category'
      await axios.get(url, config)
      .then((res) => {
        localStorage.setItem('categories', JSON.stringify(res.data))
        commit('Categories', res.data)
        /* commit('localStorageLength', 1)
        localStorage.setItem('objects', state.localStorageLength) */
      })
      .catch((error) => {
        console.log('Error obteniendo Categories', error)
        /* console.log(error)
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
        commit('Token', null)
        commit('localStorageLength', -8)
        state.localStorageLength = 0
        window.location.href = '/' */
      })
    },
    async getVisits({state, commit}){
      let fec = new Date()
      let year = fec.getFullYear()
      let datos= {
        "year": year
      }
      let config = {
        headers: {
          'Authorization': 'Bearer ' + state.accessToken
        }
      }
      let url = 'https://casa-andina-backend.azurewebsites.net/user/dashboard/visits'
      await axios.post(url, datos, config)
      .then((res) => {
        commit('Visits', res.data)
        localStorage.setItem('visitas', JSON.stringify(res.data))
      })
      .catch((error) => {
        console.log('Error obteniendo Categories', error)
        /* console.log(error)
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
        commit('Token', null)
        commit('localStorageLength', -8)
        state.localStorageLength = 0
        window.location.href = '/' */
      })
    },

    async getDashJefes({state, commit}){
      let groupSegment = 'Agencias'
      let fec = new Date()
      let month = (fec.getMonth() +1) 
      let year = fec.getFullYear()
      let months = ['[Seleccionar todos]',
        'Enero',
        'Febrero',
        'Marzo',
        'Abril',
        'Mayo',
        'Junio',
        'Julio',
        'Agosto',
        'Setiembre',
        'Octubre',
        'Noviembre',
        'Diciembre'
        ]
      let datos = {
    		"month": month,
    		"year": year
      }
      let fecha = {
        "year": year,
        "month": months[month]
      }
      let config = {
        headers: {
          'Authorization': 'Bearer ' + state.accessToken
        }
      }
      let url = 'https://casa-andina-backend.azurewebsites.net/user/dashboard/jefes'

      await axios.post(url, datos, config)
      .then(response =>{
        localStorage.setItem('dashjefe', JSON.stringify(response.data)) 
        localStorage.setItem('yearandmonth', JSON.stringify(fecha))
        commit('DashJefe', response.data)
      })
      .catch(error => {
        console.log('Error obteniendo dashboard jefes')
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
        commit('Token', null)
        commit('localStorageLength', -8)
        alert('Error al cargar dashboard Jefes', error)
        state.localStorageLength = 0
        window.location.href = '/'  */
      })
    },

    async getReasons({state, commit}){
      let config = {
        headers: {
          'Authorization': 'Bearer ' + state.accessToken
        }
      }
      let url = 'https://casa-andina-backend.azurewebsites.net/reason'
      await axios.get(url, config)
      .then((res) => {
        commit('Reasons', res.data)
        /* commit('localStorageLength', 1)
        localStorage.setItem('objects', state.localStorageLength) */
      })
      .catch((error) => {
        console.log('Error obteniendo Categories', error)
        /* console.log(error)
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
        commit('Token', null)
        commit('localStorageLength', -8)
        state.localStorageLength = 0
        window.location.href = '/' */
      })
    },

    //Obteniendo los segmentos de grupo
  
    //Verificando EL ESTADO DEL TOKEN
    async stateToken({state, commit}){
      let config = {
        headers: {
          'Authorization': 'Bearer ' + state.accessToken
        }
      }
      let url = 'https://casa-andina-backend.azurewebsites.net/user/exist_token'
      await axios.get(url, config)
      .then(response =>{

      })
      .catch(error => {
        alert('La sesion se ha terminado')
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
        localStorage.removeItem('categories')
        localStorage.removeItem('branchs')
        localStorage.removeItem('dashjefe')
        localStorage.removeItem('visitas')
        localStorage.removeItem('yearandmonth')
        localStorage.removeItem('leads-user')
        commit('Token', null)
        commit('localStorageLength', -8)
        state.localStorageLength = 0
        window.location.href = '/'
      })
    },

  
  }
})
