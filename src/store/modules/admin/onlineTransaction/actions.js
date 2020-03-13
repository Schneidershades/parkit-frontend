import axios from 'axios'

export const getTransactionOrdersOnline = ({ commit }, item) => {
	var URL = "api/admin/user/orders/online"
	// console.log(item)
	return axios.post(URL, item).then((response) => {
		commit('setTransactions', response.data.data)
		return Promise.resolve()
	})
}

export const transactionOrderSelected = ({ commit }, item) => {
	commit('setTransactionsDetails', item)
}