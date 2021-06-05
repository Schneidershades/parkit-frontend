import axios from 'axios'

export const getOrders = ({ commit, dispatch, rootState }) => {
	if(rootState.auth.role != 'user' ){
		return axios.get('api/v1/admin/user/online-orders').then((response) => {
			commit('setOrders', response.data.data)
			return Promise.resolve()
		})
	}else{
		return axios.get('api/v1/admin/user/online-orders').then((response) => {
			commit('setOrders', response.data.data)
			return Promise.resolve()
		})
	}
}

export const getLocationOrders = ({ commit, dispatch, rootState }, payload) => {
	return axios.get('api/v1/admin/user/location-history/' + payload).then((response) => {
		commit('locationHistory/setLocationHistory', response.data.data, { root: true })
		return Promise.resolve()
	})
}

export const pendingOrders = ({ commit, dispatch, rootState }) => {
	if(rootState.auth.role != 'user' ){
		return axios.get('api/v1/admin/user/pending-orders').then((response) => {
			commit('setPendingOrders', response.data.data)
			return Promise.resolve()
		})
	}else{
		return axios.get('api/v1/admin/user/pending-orders').then((response) => {
			commit('setPendingOrders', response.data.data)
			return Promise.resolve()
		})
	}
}

export const editOrder = ({ commit, dispatch, rootState }, order) =>{
	commit('setOrderDetails', order)
}

export const updateOrder = ({ commit, dispatch }, credentials) => {
	var url = 'api/v1/admin/user/online-orders/' + credentials.id
	return axios.put(url, credentials).then((response) => {
		dispatch('getOrderId', credentials.id)
		return Promise.resolve()
	})
}

export const placeOrder = ({ commit, dispatch, rootState }, order) =>{
	return axios.post('api/v1/admin/user/online-orders', order).then((response) => {
		dispatch('webAdminShopping/removeAllProductFromCartLocalStorage', null, { root: true })
		commit('setOrderDetails', response.data.data)
		return Promise.resolve()
	})
}

export const placeHomeServiceOrder = ({ commit, dispatch, rootState }, order) =>{
	return axios.post('api/v1/admin/user/unauthenticated-orders', order).then((response) => {
		dispatch('webAdminShopping/removeAllProductFromCartLocalStorage', null, { root: true })
		// commit('setOrderDetails', response.data.data)
		return Promise.resolve()
	})
}


// get products
export const getOrderId = ({ commit }, item) => {
	var URL = "api/v1/admin/user/online-orders/"+item
	return axios.get(URL).then((response) => {
		commit('setOrderDetails', response.data.data)
		return Promise.resolve()
	})
}

export const paymentProcess = ({commit}, item) => {
	return axios.post('api/v1/admin/user/payment/gateway', item).then((response) => {
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
	var url = 'api/v1/admin/user/payment/location/order/' + item
	return axios.get(url).then((response) => {
		commit('setPaymentDetails', response.data.data)
		return Promise.resolve()
	})
}

export const storeOrder = ({ commit, dispatch, rootState }, order) =>{
	commit('setOrder', order)
}

export const deleteOrder = ({ commit, dispatch }, item) => {
	var URL = "api/v1/admin/user/online-orders/"+item
	return axios.delete(URL).then((response) => {
		// dispatch('getOrders')
		return Promise.resolve()
	})
}

