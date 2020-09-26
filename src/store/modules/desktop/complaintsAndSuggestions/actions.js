import axios from 'axios'

// get products
export const getComplaintsAndSuggestions = ({ commit }) => {
	var URL = 'api/v1/admin/user/location-complaints-suggestions/' + item
	return axios.get(URL).then((response) => {
		console.log(response.data)
		commit('setReportFaults', response.data)
		return Promise.resolve()
	})
}

export const sendComplaintsAndSuggestion = ({ commit }, information) => {
	var URL = 'api/v1/admin/user/complaints-suggestions'
	return axios.post(URL, information).then((response) => {
		console.log(response.data)
		return Promise.resolve()
	})
}