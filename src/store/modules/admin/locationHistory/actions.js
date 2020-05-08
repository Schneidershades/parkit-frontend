import axios from 'axios'

// get products
export const getLocationHistory = ({ commit }) => {
	return axios.get('api/v1/admin/user/order/history').then((response) => {
		commit('setLocationHistory', response.data.data)
		return Promise.resolve()
	})
}
