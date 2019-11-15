import Vue from 'vue'
import Router from 'vue-router'

//importación de componentes creados
import TableDash from './components/TableDash'
import RegisterLead from './components/RegisterLead'
import RegisterUser from './components/RegisterUser'
import RegisterAccount from './components/RegisterAccount'
import RegisterAccountAdmin from './components/RegisterAccountAdmin'
import DashJefe from './components/BarChart'
import DashGerente from './components/DashboardJefes'
import ModalEdit from './components/ModalEdit'
import Login2 from './components/Login2'
import NotFound from './components/NotFound'
import Config from './components/Config'
import Visits from './components/Visits'
import VisitsUserId from './components/VisitsUserId'
import DashboardUserId from './components/DashboardUserId'
import Hotels from './components/RegisterHotel'
import LeadsUserId from './components/LeadsUserId'

Vue.use(Router)
const routerEjecutivo = new Router({
  routes:[
    {
      path: '/dashboard_jefes',
      name: 'dashboard_jefes',
      component: DashJefe, 
    },
    {
      path: '/dashboard_gerentes',
      name: 'dashboard_gerentes',
      component: DashGerente, 
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
      path: '/dashboard-ejecutivos/leads-user/id',
      name: 'leads-user',
      component: LeadsUserId
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
      path:'/register-account-add',
      name: 'register-account-add',
      component: RegisterAccountAdmin
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
        path : '/visits',
        name: 'visits',
        component: Visits
    },
    {
      path : '/register-hotel',
      name: 'register-hotel',
      component: Hotels
  },

    {
      path: '/dashboard_jefes/dashboard-user/id',
      name: 'dashboard-user',
      component: DashboardUserId
    },
    {
      path: '/dashboard_gerentes/dashboard-user/id',
      name: 'dashboard-user-gerente',
      component: DashboardUserId
    },
    {
      path: '/dashboard_jefes/visits-user/id',
      name: 'visits-user',
      component: VisitsUserId
    },
    {
      path: '/dashboard_jefes/leads-user/id',
      name: 'leads-user',
      component: LeadsUserId
    }, 
    {
      path: '/dashboard_gerentes/leads-user/id',
      name: 'leads-user-gerente',
      component: LeadsUserId
    },
    {
      path: '/dashboard_gerentes/visits-user/id',
      name: 'visits-user-gerente',
      component: VisitsUserId
    },
    {
      path: '*',
      redirect: '/casa-andina'
    }
  ]
})
export default routerEjecutivo;

