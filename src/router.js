import Vue from 'vue'
import Router from 'vue-router'
/* import Home from './views/Home.vue' */
import TableDash from './components/TableDash'
import RegisterLead from './components/RegisterLead'
import RegisterUser from './components/RegisterUser'
import RegisterAccount from './components/RegisterAccount'
import DashJefe from './components/Login'
import ModalEdit from './components/ModalEdit'
import Login2 from './components/Login2'
import NotFound from './components/NotFound'
import Config from './components/Config'


Vue.use(Router)
console.log('router1 iniciado')
const routerEjecutivo = new Router({
  routes:[
    {
      path: '/dashboard_jefes',
      name: 'dashboard_jefes',
      component: DashJefe, 
    },
    {
      path: '/dashboard-ejecutivos',
      name: 'dashboard-ejecutivos',
      component: TableDash,
    },
    {
      path:'/register-lead',
      name: 'register-lead',
      component: RegisterLead,
    },
    
    {
      path:'/register-user',
      name: 'register-user',
      component: RegisterUser
    },
    {
      path:'/register-account',
      name: 'register-account',
      component: RegisterAccount
    },
    {
      path:'/modaledit',
      name: 'modaledit',
      component: ModalEdit
    },
    {
      path: '/login',
      name: 'login',
      component: Login2
    },
    {
      path: '/casa-andina',
      name: 'casa-andina',
      component: NotFound
    },
    {
        path: '/profile',
        name: 'profile',
        component: Config
      },
    {
      path: '*',
      redirect: '/casa-andina'
    }
  ]
})
console.log('router 1 - fin')

export default routerEjecutivo;

