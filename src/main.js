import Vue from 'vue'

import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.css'
import App from './App'
import router from './router'
import { store } from './store'
import DateFilter from './filters/date'
Vue.use(Vuetify)
Vue.filter('date', DateFilter)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
