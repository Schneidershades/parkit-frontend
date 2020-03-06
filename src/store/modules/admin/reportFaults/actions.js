import axios from 'axios'

// get products
export const getReportFaults = ({ commit }) => {
	var URL = 'admin/user/report-faults'
	return axios.get(URL).then((response) => {
		console.log(response.data)
		commit('setReportFaults', response.data)
		return Promise.resolve()
	})
}

export const sendReportFaults = ({ commit }, information) => {
	var URL = 'admin/user/report-faults'
	return axios.post(URL, information).then((response) => {
		console.log(response.data)
		return Promise.resolve()
	})
}