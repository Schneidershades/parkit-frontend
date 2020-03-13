import axios from 'axios'

// get products
export const getGallery = ({ commit }) => {
	return axios.get('api/gallery').then((response) => {
		console.log(response.data)
		commit('setGallery', response.data)
		return Promise.resolve()
	})
}