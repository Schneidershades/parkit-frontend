import axios from 'axios'

// get products
export const getAddresses = ({ commit }) => {
	return axios.get('auth/addresses').then((response) => {
		// console.log(response.data)
		commit('setAddresses', response.data)
		return Promise.resolve()
	})
}

export const saveAddress = ({ commit, dispatch }, items) => {
	return axios.post('auth/addresses', items).then((response) => {
		// console.log(response.data)
		dispatch('getAddresses')
		return Promise.resolve()
	})
}