import axios from 'axios'
import { LocalStorage } from 'quasar'


// get products
export const getOrders = ({ commit, dispatch, rootState }) => {
	if(rootState.auth.role != 'user' ){
		return axios.get('api/v1/auth/orders').then((response) => {
			// console.log(response.data)
			commit('setOrders', response.data.data)
			return Promise.resolve()
		})
	}else{
		return axios.get('api/v1/auth/orders').then((response) => {
			// console.log(response.data)
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
		// console.log(response.data.data)
		commit('setOrderDetails', response.data.data)
		return Promise.resolve()
	})
}

export const paymentProcess = ({commit}, item) => {
	// var content = JSON.stringify(item)

	return axios.post('api/v1/auth/payment/gateway', item).then((response) => {
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
	var url = 'api/v1/auth/payment/location/order/' + item
	return axios.get(url).then((response) => {
		commit('setPaymentDetails', response.data.data)
		return Promise.resolve()
	})
}


export const storeOrder = ({ state, commit, dispatch, rootState }, order) =>{
	commit('setOrder', order)
	var receipt = LocalStorage.getItem('receiptOrderNumber')
	// console.log(receipt)
	LocalStorage.set('orders', JSON.stringify(state.orders))
	var newNumber = receipt + 1
	LocalStorage.set('receiptOrderNumber', newNumber)
	dispatch('updateRecieptNumber')
	dispatch('adminShopping/removeAllProductFromCart', null, { root: true })
	dispatch('adminShopping/removeAllProductFromCart', null, { root: true })
	commit('adminShopping/applyResetDiscountData', null, { root: true })
	dispatch('customerPlateNumbers/removeCurrentPlateNumberFromLocalStorage', null, { root: true })
}

export const updateRecieptNumber = ({ state, commit, dispatch, rootState }, order) =>{
	commit('setNewPhoneNumber', LocalStorage.getItem('receiptOrderNumber'))
} 

export const checkRecieptNumber = ({ state, commit, dispatch, rootState }, order) =>{
	console.log(LocalStorage.getItem('receiptOrderNumber'))
	if(LocalStorage.getItem('receiptOrderNumber') <= 0){
		LocalStorage.set('receiptOrderNumber', JSON.stringify(10000))
	}
}

export const sendOrder = ({ state, commit, dispatch, rootState }, order) =>{
	commit('setOrderDetails', order)
}

export const processRequest = ({ state, commit, dispatch, rootState }, order) =>{
	commit('setUpdateOrderDetails', order)
	LocalStorage.set('orders', JSON.stringify(state.orders))
}


export const setCurrentUserEditRight = async ({ commit }, items) =>{
	return commit('setCurrentUserEditRight', items)
}

export const setCurrentUserDeleteRight = async ({ commit }, items) =>{
	return commit('setCurrentUserDeleteRight', items)
}

export const signInaUserWithEditPrivilege = async ({ commit }, items) =>{
	await axios.post('api/v1/admin/user/permission/authorize', items).then((response) => {
		commit('setSignedInaUserWithEditPrivilege', true)
		return Promise.resolve()
	}).catch((error) => {
        return Promise.reject()
    }) 
}

export const signInaUserWithDeletePrivilege = async ({ commit }, items) =>{
	await axios.post('api/v1/admin/user/permission/authorize', items).then((response) => {
		commit('setSignedInaUserWithDeletePrivilege', true)
		return Promise.resolve()
	}).catch((error) => {
        return Promise.reject()
    }) 
}



export const getUsersWithRight = async ({ commit }, item) =>{
	// console.log(items)
	await axios.post('api/v1/admin/user/check-permission', {'permission' : item}).then((response) => {
		console.log(response.data)
		commit('setUsersWithRight', response.data)
		return Promise.resolve()
	}).catch((error) => {
		// console.log(error.response.data)
        // commit('updateDiscountData', null)
        return Promise.reject()
    }) 
}

export const getUserDeletePrivilege = async ({ commit }, item) =>{
	// console.log(items)
	await axios.post('api/v1/admin/user/check-permission', {'permission' : item}).then((response) => {
		// console.log(response.data)
		commit('setUserDeletePrivilege', response.data)
		return Promise.resolve()
	}).catch((error) => {
		// console.log(error.response.data)
        // commit('updateDiscountData', null)
        return Promise.reject()
    }) 
}
