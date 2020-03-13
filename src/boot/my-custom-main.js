import Vue from 'vue'
import axios from 'axios'
import App from 'app/src/App.vue'
import { LocalStorage, SessionStorage } from 'quasar'

export default async ({ app, router, store, Vue }) => {
  	// something to do
  	axios.defaults.withCredentials = true

  	axios.defaults.baseURL= 'http://localhost:8000'
  	//axios.defaults.baseURL= 'https://parkit-backend-app.herokuapp.com/api'
	store.dispatch('auth/attempt').then(() => {
		new Vue({
			router,
			store,
			render: h => h(App)
		}).$mount('#q-app')
	})
}


