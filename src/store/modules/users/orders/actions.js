import axios from 'axios'


// get products
export const getOrders = ({ commit, dispatch, rootState }) => {
	if(rootState.auth.role != 'user' ){
		return axios.get('api/v1/auth/orders').then((response) => {
			commit('setOrders', response.data.data)
			return Promise.resolve()
		})
	}else{
		return axios.get('api/v1/auth/orders').then((response) => {
			commit('setOrders', response.data.data)
			return Promise.resolve()
		})
	}
}

export const placeOrder = ({ commit, dispatch, rootState }, order) =>{
	return axios.post('api/v1/auth/orders', order).then((response) => {
		dispatch('shopping/removeAllProductFromCartLocalStorage', null, { root: true })
		commit('setOrderDetails', response.data.data)
		return Promise.resolve()
	})
}

// get products
export const getOrderId = ({ commit }, item) => {
	var URL = "api/v1/auth/orders/"+item
	return axios.get(URL).then((response) => {
		commit('setOrderDetails', response.data.data)
		return Promise.resolve()
	})
}

export const paymentProcess = ({commit}, item) => {
	return axios.post('api/v1/auth/payment/gateway', item).then((response) => {
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
	var url = 'api/v1/auth/payment/location/order/' + item
	return axios.get(url).then((response) => {
		commit('setPaymentDetails', response.data.data)
		return Promise.resolve()
	})
}

export const storeOrder = ({ commit, dispatch, rootState }, order) =>{
	commit('setOrder', order)
}

