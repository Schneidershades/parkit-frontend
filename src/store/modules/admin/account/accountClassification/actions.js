import axios from 'axios'

export const getAccountClassification = ({ commit }) => {
	var URL = "api/v1/admin/user/account/classification"
	return axios.get(URL).then((response) => {
		commit('setAccountClassification', response.data.data)
		return Promise.resolve()
	})
}