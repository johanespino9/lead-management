import Vue from 'vue'
import Router from 'vue-router'
/* import Home from './views/Home.vue' */
import TableDash from './components/TableDash'
import RegisterLead from './components/RegisterLead'
import RegisterUser from './components/RegisterUser'
import RegisterAccount from './components/RegisterAccount'
import login from './views/login'
import ModalEdit from './components/ModalEdit'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: login
    },
    {
      path:'/registerlead',
      name: 'registerlead',
      component: RegisterLead
    },
    {
      path: '/tabledash',
      name: 'tabledash',
      component: TableDash
    },
    {
      path:'/registeruser',
      name: 'registeruser',
      component: RegisterUser
    },
    {
      path:'/registeraccount',
      name: 'registeraccount',
      component: RegisterAccount
    },
    {
      path:'/modaledit',
      name: 'modaledit',
      component: ModalEdit
    }
  ]
})
