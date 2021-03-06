import axios from 'axios'

// get products
export const getPersonnelRequests = ({ commit }) => {
	var URL = 'admin/user/personnel-requests'
	return axios.get(URL).then((response) => {
		console.log(response.data)
		commit('setReportFaults', response.data)
		return Promise.resolve()
	})
}

export const sendPersonnelRequest = ({ commit }, information) => {
	var URL = 'admin/user/personnel-requests'
	return axios.post(URL, information).then((response) => {
		console.log(response.data)
		return Promise.resolve()
	})
}