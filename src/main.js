import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify';
import 'roboto-fontface/css/roboto/roboto-fontface.css'
import '@mdi/font/css/materialdesignicons.css'
import "chart.js";
import "hchs-vue-charts";
import Axios from 'axios'
import BootstrapVue from 'bootstrap-vue'



Vue.use(BootstrapVue)
Vue.use(window.VueCharts);



Vue.config.productionTip = false
Vue.prototype.$http = Axios;
const accessToken = localStorage.getItem('access_token')

if (accessToken) {
  Vue.prototype.$http.defaults.headers.common['Authorization'] = accessToken
}

new Vue({
  store,
  BootstrapVue,
  vuetify,
  router,
  render: h => h(App)
}).$mount('#app')
