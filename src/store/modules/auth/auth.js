import axios from 'axios'

export default ({
	namespaced: true,

	state: {
		token: null,
		user: null,
		phone: null,
	},

	getters:{
		authenticated (state){
			return state.token && state.user
		},

		user(state){
			return state.user
		},

		phone(state){
			return state.phone
		}
	},

	mutations: {
		SET_TOKEN (state, token) {
			state.token = token
		},

		SET_USER (state, data) {
			state.user = data
		},

		SET_PHONE_NUMBER (state, phone) {
			state.phone = phone
		}
	},

	actions: {
		async signIn({dispatch}, credentials){
			// let response = await axios.post('auth/signin', credentials);
			// dispatch('attempt', response.data.token)

			return new Promise((resolve, reject) => {
	            axios.post('auth/signin', credentials).then(response => {
	                dispatch('attempt', response.data.token)
	                resolve()
	            }, error => {
	                dispatch('flashMessage', error.response.data.data.error, {root:true})
	            })
		    })	
			
		},

		async adminSignIn({dispatch}, credentials){
			return new Promise((resolve, reject) => {
	            axios.post('admin/user/signin', credentials).then(response => {
	                dispatch('attempt', response.data.token)
	                resolve()
	            }, error => {
	                dispatch('flashMessage', error.response.data.data.error, {root:true})
	                // console.log(error.response.data.data.error)
	            })
		    })			
		},

		async attempt({ commit, dispatch, state }, token){
			// console.log(token)

			if(token){
				commit('SET_TOKEN', token)

			}else{
				console.log('bad')
			}


			if(!state.token){
				return
			}

			try{
				return new Promise((resolve, reject) => {
		            axios.get('auth/me').then(response => {
		                commit('SET_USER', response.data.data)
						dispatch('shopping/storeCart', null, { root: true })
						return dispatch('shopping/getCart', null, { root: true })
		            }, error => {
		                // dispatch('flashErrorMessage', error.response.data, {root:true})
		                // console.log(error.response.data.data.error)
		                // reject(error.response.data.data.error)
		            })
		        })
			}catch (e){
				commit('SET_USER', null)
				commit('SET_TOKEN', null)
			}
		},
		
		signOut({ commit, rootState }){
			return axios.post('auth/signout').then(() =>{
				commit('SET_USER', null)
				commit('SET_TOKEN', null)
				commit('shopping/clearCart', null, { root: true })
			})
		},

		async sendPhoneNumber({commit, dispatch}, phone_number){
			return new Promise((resolve, reject) => {
	            axios.post('phone', phone_number).then(response => {
	                dispatch('flashMessage', response.data.data.message, {root:true})
	                resolve(response);
					commit('SET_PHONE_NUMBER', phone_number)
	            }, error => {
	                dispatch('flashErrorMessage', error.response.data, {root:true})
	                // console.log(error.response.data.data.error)
	                reject(error.response.data.data.error);
	            })
	        })
		},

		async verifyOTP({commit, dispatch}, credentials){
			return new Promise((resolve, reject) => {
	            axios.post('verify-otp', credentials).then(response => {
	                dispatch('flashMessage', response.data.data.message, {root:true})
	                resolve(response);
	            }, error => {
	                dispatch('flashErrorMessage', error.response.data, {root:true})
	                // console.log(error.response.data.data)
	                reject(error.response.data.data);
	            })
	        })
		},

		async signUp({dispatch}, credentials){
			let response = await axios.post('auth/signup', credentials);
			// console.log(response.data.data.message)
			return dispatch('attempt', response.data.data.message.token)
		},
	},
})
