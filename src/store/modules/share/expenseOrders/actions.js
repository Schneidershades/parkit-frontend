import axios from 'axios'

// get products
export const getExpenseOrders = ({ commit }) => {
	var URL = 'api/v1/admin/user/expense-orders'
	return axios.get(URL).then((response) => {
		console.log(response.data)
		commit('setOrders', response.data.data)
		return Promise.resolve()
	})
}

export const findExpenseOrders = ({ commit }, id) => {
	var URL = 'api/v1/admin/user/expense-orders/' + id
	return axios.get(URL).then((response) => {
		console.log(response.data)
		commit('setExpenseOrderDetails', response.data)
		return Promise.resolve()
	})
}


export const getPenaltyAndDeduction = ({ commit }) => {
	var URL = 'api/v1/admin/user/penalty-and-deduction'
	return axios.get(URL).then((response) => {
		console.log(response.data)
		commit('setOrders', response.data.data)
		return Promise.resolve()
	})
}

export const getLoanAndOutstanding = ({ commit }) => {
	var URL = 'api/v1/admin/user/loan-and-outstanding'
	return axios.get(URL).then((response) => {
		console.log(response.data)
		commit('setOrders', response.data.data)
		return Promise.resolve()
	})
}

export const sendExpenseOrder = ({ commit }, information) => {
	var URL = 'api/v1/admin/user/expense-orders'
	return axios.post(URL, information).then((response) => {
		console.log(response.data)
		return Promise.resolve()
	})
}

export const approveExpenseOrder = ({ commit, dispatch, rootState }, information) => {
	var URL = 'api/v1/admin/user/expense-order-requests'
	return axios.post(URL, information).then((response) => {
		// console.log(response.data.data.message)
	   	dispatch('errorbag/flashMessage', response.data.data.message, {root:true})
		return Promise.resolve()
	}, error => {
	   	dispatch('errorbag/flashMessage', error.response.data.data.error, {root:true})
        return Promise.reject()
    })

}
