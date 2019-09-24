import Vue from 'vue'
import Router from 'vue-router'

import TableDash from '../components/TableDash'
import RegisterLead from '../components/RegisterLead'
import RegisterUser from '../components/RegisterUser'
import RegisterAccount from '../components/RegisterAccount'
import DashJefe from '../components/Login'
import ModalEdit from '../components/ModalEdit'
import Login2 from '../components/Login2'
import NotFound from '../components/NotFound'
import Config from '../components/Config'


Vue.use(Router)
console.log('Router 2 iniciado')
const routerSupervisores = new Router({
  routes: [
    {
      path: '/boss-dashboard',
      name: 'home',
      component: DashJefe
    },
    {
      path: '/tabledash',
      name: 'tabledash',
      component: TableDash
    },
    {
      path:'/registerlead',
      name: 'registerlead',
      component: RegisterLead
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
    },
    {
      path: '/login',
      name: 'login',
      component: Login2
    },
    {
      path: '/casa',
      name: 'casa',
      component: NotFound
    },
    {
        path: '/settings',
        name: 'settings',
        component: Config
      },
    {
      path: '*',
      redirect: '/casa'
    }
  ],
}) 
console.log('router 2 fin')
export default routerSupervisores; 
