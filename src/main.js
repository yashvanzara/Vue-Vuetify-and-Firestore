import Vue from 'vue'

import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.css'
import App from './App'
import router from './router'
import { store } from './store'
import DateFilter from './filters/date'
import * as firebase from 'firebase'
import Alert from './components/Shared/Alert'
import EditMeetupDetailsDialog from './components/Meetup/Edit/EditMeetupDetailsDialog'

Vue.use(Vuetify)
Vue.filter('date', DateFilter)
Vue.component('app-alert', Alert)
Vue.config.productionTip = false
Vue.component('app-edit-meetup-details-dialog', EditMeetupDetailsDialog)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App),
  created () {
    firebase.initializeApp({
      apiKey: 'AIzaSyDIxFGN_vozpQLbFNaRY0YssKCDyqi5BrM',
      authDomain: 'devmeetup-50f79.firebaseapp.com',
      databaseURL: 'https://devmeetup-50f79.firebaseio.com',
      projectId: 'devmeetup-50f79',
      storageBucket: 'devmeetup-50f79.appspot.com'
    })
    firebase.auth().onAuthStateChanged((user) => {
      // Detect whether the user signed in or a token is already present in the session
      if (user) {
        this.$store.dispatch('autoSignIn', user)
      }
    })
    this.$store.dispatch('loadMeetups')
  }
})
