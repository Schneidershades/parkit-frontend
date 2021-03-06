import Vue from 'vue'
// import App from './App.vue'
// import router from './router'
// import store from './store'
import axios from 'axios'

// require('./store/subscriber')


import App from 'app/src/App.vue'



export default async ({ app, router, store, Vue }) => {
  	// something to do
  	axios.defaults.baseURL= 'http://127.0.0.1:8000/api'

  	axios.defaults.withCredentials = true

	// Vue.config.productionTip = false

	// console.log(localStorage.getItem('token'))
	// store.dispatch('auth/attempt', localStorage.getItem('token'))

	store.dispatch('auth/attempt', localStorage.getItem('token')).then(() => {
		new Vue({
			router,
			store,
			render: h => h(App)
		}).$mount('#q-app')
	})
}


