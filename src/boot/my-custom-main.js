import Vue from 'vue'
import axios from 'axios'
import App from 'app/src/App.vue'



export default async ({ app, router, store, Vue }) => {
  	// something to do
<<<<<<< HEAD
  	axios.defaults.withCredentials = true

  	axios.defaults.baseURL= process.env.BACKEND_API_URL
  	//axios.defaults.baseURL= 'https://parkit-backend-app.herokuapp.com/api'
	store.dispatch('auth/attempt').then(() => {
=======
  	axios.defaults.baseURL= 'http://127.0.0.1:8000/api'
	store.dispatch('auth/attempt', localStorage.getItem('token')).then(() => {
>>>>>>> parent of 3be25e0... updates
		new Vue({
			router,
			store,
			render: h => h(App)
		}).$mount('#q-app')
	})
}


