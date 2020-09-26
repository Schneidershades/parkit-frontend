import axios from 'axios'

// get products
export const getLocationRequisitionOrder = ({ commit, dispatch, rootState }, item) => {
	var URL = 'api/v1/admin/user/location-requisition-orders/' + item
	return axios.get(URL).then((response) => {
		console.log(response.data)
		commit('setRequisitionOrder', response.data.data)
		return Promise.resolve()
	})
}

export const sendRequisitionOrder = ({ commit, dispatch, rootState }, information) => {
	var URL = 'api/v1/admin/user/requisition-orders'
	return axios.post(URL, information).then((response) => {
		dispatch('getLocationRequisitionOrder', information.location_id)
		console.log(response.data)
		return Promise.resolve()
	})
}