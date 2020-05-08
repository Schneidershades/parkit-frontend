import axios from 'axios'

export const getAccountLocation = ({ commit }, item) => {
	var URL = "api/v1/admin/user/account/locations-accounts"
	return axios.get(URL).then((response) => {
		commit('setAccountLocation', response.data.data)
		return Promise.resolve()
	})
}

export const setAccountLocationSelected = ({ commit }, item) => {
	commit('setAccountLocationDetails', item)
}

export const sendTransactions = ({ commit, dispatch, rootState}, item) => {
	var URL = "api/v1/admin/user/account/post-income-expense-transaction"
	var transactions = {
		"transactions": item
	}


	return axios.post(URL, transactions).then((response) => {
		dispatch('auth/attempt', rootState.auth.token, { root: true })
		return Promise.resolve()
	})
}

export const getAccountLocationDetails = ({ commit }, item) => {
	var URL = "api/v1/admin/user/account/locations-accounts/"+ item
	return axios.get(URL).then((response) => {
		commit('setAccountLocationDetails', response.data.data)
		return Promise.resolve()
	})
}

export const getAccountLocationTransactions = ({ commit }, item) => {
	var URL = "api/v1/admin/user/account/post-income-expense-transaction/"+ item
	return axios.get(URL).then((response) => {
		commit('setAccountLocationTransactions', response.data.data)
		return Promise.resolve()
	})
}

export const sendAccountLocationTransactionSelected = ({ commit }, item) => {
	commit('setAccountLocationTransactionSelected', item)
	return Promise.resolve()
}

export const deleteAccountLocationTransactionSelected = ({ commit, dispatch, rootState }, item) => {
	var URL = "api/v1/admin/user/account/post-income-expense-transaction/"+ item.id
	return axios.delete(URL).then((response) => {
		dispatch('auth/attempt', rootState.auth.token, { root: true })
		dispatch('getAccountLocationTransactions', item.locationId)
		return Promise.resolve()
	})
}