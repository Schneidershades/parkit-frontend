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

export const sendTransactions = ({ commit }, item) => {
	var URL = "api/v1/admin/user/account/post-income-expense-transaction"
	return axios.post(URL).then((response) => {
		return Promise.resolve()
	})
}