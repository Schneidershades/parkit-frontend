import axios from 'axios'


export const getLocationUsers = ({ commit }, item) => {
	var URL = "api/v1/admin/user/location/users/"+ item
	return axios.get(URL).then((response) => {
		commit('setLocationUsers', response.data.data)
		return Promise.resolve()
	})
}