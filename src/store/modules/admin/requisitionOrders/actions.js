import axios from 'axios'

// get products
export const getRequisitionOrder = ({ commit }) => {
	var URL = 'api/v1/admin/user/requisition-orders'
	return axios.get(URL).then((response) => {
		console.log(response.data)
		commit('setRequisitionOrder', response.data)
		return Promise.resolve()
	})
}

export const sendRequisitionOrder = ({ commit }, information) => {
	var URL = 'api/v1/admin/user/requisition-orders'
	return axios.post(URL, information).then((response) => {
		console.log(response.data)
		return Promise.resolve()
	})
}