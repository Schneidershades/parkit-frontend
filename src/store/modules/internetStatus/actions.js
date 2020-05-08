import axios from 'axios'

// get products
export const setConnection = ({ commit }, payload) => {
	console.log(payload)
	commit('setConnection', payload)
}
