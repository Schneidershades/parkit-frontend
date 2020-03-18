import axios from 'axios'

// get products
export const getLocations = ({ commit }) => {
	return axios.get('api/data/locations').then((response) => {
		console.log(response.data)
		commit('setLocations', response.data)
		return Promise.resolve()
	})
}