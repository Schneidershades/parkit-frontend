import axios from 'axios'

// get products
export const getReportFaults = ({ commit, rootState }) => {
	var URL = 'api/v1/admin/user/report-faults'
	return axios.get(URL).then((response) => {
		console.log(response.data)
		commit('setReportFaults', response.data)
		return Promise.resolve()
	}).catch((error) => {
		if (!error.response) {
    		return dispatch('internetStatus/setConnection', false, {root:true})
        }
  		return Promise.reject()
  	})
}

export const sendReportFaults = ({ commit, rootState }, information) => {
	var URL = 'api/v1/admin/user/report-faults'
	return axios.post(URL, information).then((response) => {
		console.log(response.data)
		return Promise.resolve()
	}).catch((error) => {
		if (!error.response) {
    		return dispatch('internetStatus/setConnection', false, {root:true})
        }
  		return Promise.reject()
  	})
}