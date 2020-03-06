import axios from 'axios'

// get products
export const getPackages = ({ commit }) => {
	return axios.get('admin/user/packages').then((response) => {
		console.log(response.data)
		commit('setPackages', response.data)
		return Promise.resolve()
	})
}