import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import LeadRegister from './views/LeadRegister.vue'
import TableDash from './components/TableDash'
import RegisterLead from './components/RegisterLead'
import Lead from './components/Lead'

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
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    }
  ]
})
