import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import LeadRegister from './views/LeadRegister.vue'
import TableDash from './components/TableDash'
import RegisterLead from './components/RegisterLead'
import Lead from './components/Lead'
import RegisterUser from './components/RegisterUser'
import RegisterAccount from './components/RegisterAccount'
import Login from './views/Login'
import Session from './views/Session'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Lead
    },
    {
      path:'/leadregister',
      name: 'leadregister',
      component: LeadRegister
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
      path:  '/Login',
      name:  'Login',
      component:  Login
    },
    {
      path:  '/Session',
      name:  'Session',
      component:  Session
    }
  ]
})
