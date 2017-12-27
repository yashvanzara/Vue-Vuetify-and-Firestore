import Vue from 'vue'

import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.css'
import App from './App'
import router from './router'
import { store } from './store'
import DateFilter from './filters/date'
import * as firebase from 'firebase'
import Alert from './components/Shared/Alert'
Vue.use(Vuetify)
Vue.filter('date', DateFilter)
Vue.component('app-alert', Alert)
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App),
  created () {
    firebase.initializeApp({
      apiKey: 'AIzaSyB2YeGj2V_hO8jjAYmy09VdSI8oHCdieiw',
      authDomain: 'devmeetup-69e72.firebaseapp.com',
      databaseURL: 'https://devmeetup-69e72.firebaseio.com',
      projectId: 'devmeetup-69e72',
      storageBucket: 'devmeetup-69e72.appspot.com'
    })
  }
})
