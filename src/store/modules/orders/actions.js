import axios from 'axios'


// get products
export const getOrders = ({ commit, dispatch, rootState }) => {
	if(rootState.auth.role != 'user' ){
		return axios.get('admin/user/order/history').then((response) => {
			// console.log(response.data)
			commit('setOrders', response.data.data)
			return Promise.resolve()
		})
	}else{
		return axios.get('auth/orders').then((response) => {
			// console.log(response.data)
			commit('setOrders', response.data.data)
			return Promise.resolve()
		})
	}
}

export const placeOrder = ({ commit, dispatch, rootState }, order) =>{
	return axios.post('auth/orders', order).then((response) => {
		// console.log(order)
		// rootState.shopping.removeAllProductFromCartLocalStorage
		commit('setOrderDetails', response.data.data)
		return Promise.resolve()
	})
}


// get products
export const getOrderId = ({ commit }, item) => {
	var URL = "auth/orders/"+item
	return axios.get(URL).then((response) => {
		// console.log(response.data.data)
		commit('setOrderDetails', response.data.data)
		return Promise.resolve()
	})
}

export const paymentProcess = ({commit}, item) => {
	// var content = JSON.stringify(item)

	return axios.post('auth/payment/gateway', item).then((response) => {
		// console.log(content)
		// console.log(response.data.data)
		commit('setPaymentDetails', item)
		dispatch('startPaymentTimeout')
		return Promise.resolve()
	})
}


export const startPaymentTimeout = ({ commit, dispatch, state}) =>{
	if(state.paymentTimeout !== null){
		return 
	}

	// set save timeout 1000ms
	commit('setPaymentTimeout', {
		callback(){
			dispatch('stopPaymentTimeout')
		},
		delay: 5000
	})
}

export const stopPaymentTimeout = ({ commit }) =>{
	commit('stopPaymentTimeout')
}


export const payAtLocation = ({ commit }, item) =>{
	var url = 'auth/payment/location/order/' + item
	return axios.get(url).then((response) => {
		commit('setPaymentDetails', response.data.data)
		return Promise.resolve()
	})
}