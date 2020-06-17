import axios from 'axios'

export const getAccountClassification = ({ commit, rootState }) => {
	var URL = "api/v1/admin/user/account/classification"
	return axios.get(URL).then((response) => {
		commit('setAccountClassification', response.data.data)
		return Promise.resolve()
	}).catch((error) => {
		if (!error.response) {
    		return dispatch('internetStatus/setConnection', false, {root:true})
        }
  		return Promise.reject()
  	})
}