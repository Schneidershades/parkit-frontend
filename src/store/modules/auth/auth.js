import axios from 'axios'

export default ({
	namespaced: true,

	state: {
		token: null,
		user: null,
		phone: null,
		onlineStatus: null,
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
		},

		onlineStatus(state){
			return state.onlineStatus
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
		},

		SET_ONLINE_STATUS (state, onlineStatus) {
			state.onlineStatus = onlineStatus
		}
	},

	actions: {
		async signIn({dispatch}, credentials){
			// let response = await axios.get('airlock/csrf-cookie', credentials);
			// dispatch('attempt', response.data.token)

			return new Promise((resolve, reject) => {
	            axios.post('api/v1/auth/signin', credentials).then(response => {
	            	// console.log(response.data.token)
	                dispatch('attempt', response.data.token)
	                resolve()
	            }, error => {
	                dispatch('flashMessage', error.response.data.data.error, {root:true})
	                reject()
	            })
		    })	
			
		},

		async adminSignIn({dispatch}, credentials){
			return new Promise((resolve, reject) => {
	            axios.post('api/v1/admin/user/signin', credentials).then(response => {
	                dispatch('attempt', response.data.token)
	                resolve()
	            }, error => {
	                dispatch('flashMessage', error.response.data.data.error, {root:true})
	                // console.log(error.response.data.data.error)
	                reject()
	            })
		    })			
		},

		async attempt({ commit, dispatch, state }, token){
			if(token){
				commit('SET_TOKEN', token)
			}

			if(!state.token){
				return
			}

			try{
				return new Promise((resolve, reject) => {
		            axios.get('api/v1/auth/me').then(response => {
		                commit('SET_USER', response.data.data)
						dispatch('shopping/storeCart', null, { root: true })
						dispatch('shopping/getCart', null, { root: true })
						resolve()
		            }, error => {
		                // dispatch('flashErrorMessage', error.response.data, {root:true})
		                // console.log(error.response.data.data.error)
		                // reject(error.response.data.data.error)
		                reject()
		            })
		        })
			}catch (e){
				commit('SET_USER', null)
				commit('SET_TOKEN', null)
			}
		},
		
		signOut({ commit, rootState }){
			commit('adminOrders/sendOfflineOrders', null, { root: true })
			return axios.post('api/v1/auth/signout').then(() =>{
				commit('SET_USER', null)
				commit('SET_TOKEN', null)
				commit('shopping/clearCart', null, { root: true })
			})
		},

		async sendPhoneNumber({commit, dispatch}, phone_number){
			return new Promise((resolve, reject) => {
	            axios.post('api/v1/phone', phone_number).then(response => {
	                dispatch('flashMessage', response.data.data.message, {root:true})
	                resolve(response);
					commit('SET_PHONE_NUMBER', phone_number)
	            }, error => {
	                dispatch('flashErrorMessage', error.response.data, {root:true})
	                reject(error.response.data.data.error);
	            })
	        })
		},

		async verifyOTP({commit, dispatch}, credentials){
			return new Promise((resolve, reject) => {
	            axios.post('api/v1/verify-otp', credentials).then(response => {
	                dispatch('flashMessage', response.data.data.message, {root:true})
	                resolve(response);
	            }, error => {
	                dispatch('flashErrorMessage', error.response.data, {root:true})
	                reject(error.response.data.data);
	            })
	        })
		},

		async sendForgotPasswordPhoneNumber({commit, dispatch}, phone_number){
			return new Promise((resolve, reject) => {
	            axios.post('api/v1/forgot-password/phone', phone_number).then(response => {
	                dispatch('flashMessage', response.data.data.message, {root:true})
	                resolve(response);
					commit('SET_PHONE_NUMBER', phone_number)
	            }, error => {
	                dispatch('flashErrorMessage', error.response.data, {root:true})
	                reject(error.response.data.data.error);
	            })
	        })
		},

		async verifyForgotPasswordOTP({commit, dispatch}, credentials){
			return new Promise((resolve, reject) => {
	            axios.post('api/v1/forgot-password/verify-otp', credentials).then(response => {
	                dispatch('flashMessage', response.data.data.message, {root:true})
	                resolve(response);
	            }, error => {
	                dispatch('flashErrorMessage', error.response.data, {root:true})
	                reject(error.response.data.data);
	            })
	        })
		},

		async ForgotPasswordChange({commit, dispatch}, credentials){
			return new Promise((resolve, reject) => {
	            axios.post('api/v1/auth/change/password', credentials).then(response => {
	                dispatch('flashMessage', response.data.data.message, {root:true})
	                resolve(response);
	            }, error => {
	                dispatch('flashErrorMessage', error.response.data, {root:true})
	                reject(error.response.data.data);
	            })
	        })
		},


		async PasswordReset({commit, dispatch}, credentials){
			return new Promise((resolve, reject) => {
	            axios.post('api/v1/auth/password-reset', credentials).then(response => {
	                dispatch('flashMessage', response.data.data.message, {root:true})
	                resolve(response);
	            }, error => {
	                dispatch('flashErrorMessage', error.response.data.data.error, {root:true})
	                reject(error.response.data.data);
	            })
	        })
		},

		async CheckPasswordResetToken({commit, dispatch}, credentials){
			return new Promise((resolve, reject) => {
	            axios.get('api/v1/auth/password-reset/'+ credentials).then(response => {
	                dispatch('flashMessage', response.data.data.message, {root:true})
	                resolve(response);
	            }, error => {
	                dispatch('flashErrorMessage', error.response.data.data.error, {root:true})
	                reject(error.response.data.data);
	            })
	        })
		},

		async NewPasswordReset({commit, dispatch}, credentials){
			return new Promise((resolve, reject) => {
	            axios.patch('api/v1/auth/password-reset/update', credentials).then(response => {
	                dispatch('flashMessage', response.data.data.message, {root:true})
	                resolve(response);
	            }, error => {
	                dispatch('flashErrorMessage', error.response.data.data.error, {root:true})
	                reject(error.response.data.data);
	            })
	        })
		},

		async updateProfile({commit, dispatch}, credentials){
			return new Promise((resolve, reject) => {
	            axios.post('api/v1/auth/profile/update', credentials).then(response => {
	                dispatch('flashMessage', response.data.data.message, {root:true})
	                dispatch('attempt', response.data.token)
	                resolve(response);
	            }, error => {
	                dispatch('flashErrorMessage', error.response.data, {root:true})
	                reject(error.response.data.data);
	            })
	        })
		},

		async signUp({dispatch}, credentials){
			return new Promise((resolve, reject) => {
	            axios.post('api/v1/auth/signup', credentials).then(response => {
	                dispatch('attempt', response.data.token)
	                resolve()
	            }, error => {
	                dispatch('flashMessage', error.response.data.data.error, {root:true})
	                reject()
	            })
		    })	
		},

		onlineStatus({ commit, rootState }, credentials){
	        commit('SET_ONLINE_STATUS', credentials)
		},
	},
})
