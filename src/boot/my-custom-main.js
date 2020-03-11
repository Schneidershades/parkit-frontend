import Vue from 'vue'
import axios from 'axios'
import App from 'app/src/App.vue'
import { LocalStorage, SessionStorage } from 'quasar'

export default async ({ app, router, store, Vue }) => {
  	// something to do
  	// axios.defaults.baseURL= 'http://127.0.0.1:8000/api'
  	axios.defaults.baseURL= 'https://parkit-backend-app.herokuapp.com/api'
	store.dispatch('auth/attempt', LocalStorage.getItem('token')).then(() => {
		new Vue({
			router,
			store,
			render: h => h(App)
		}).$mount('#q-app')
	})
}


