import axios from 'axios'

// get products
export const sendContactUsEmail = ({ commit }, credentials) => {
	return axios.get('api/send/contact').then((response) => {
		console.log(response.data)
		commit('setContact', response.data)
		return Promise.resolve()
	})
}

export const sendTrainingAndConsultancyEmail = ({ commit }, credentials) => {
	return axios.get('api/send/training-consultancy').then((response) => {
		console.log(response.data)
		commit('setTrainingAndConsultancy', response.data)
		return Promise.resolve()
	})
}

export const sendCareerEmail = ({ commit }, credentials) => {
	return axios.get('api/send/careers').then((response) => {
		console.log(response.data)
		commit('setCareers', response.data)
		return Promise.resolve()
	})
}

export const sendPartnerEmail = ({ commit }, credentials) => {
	return axios.get('api/send/partnership').then((response) => {
		console.log(response.data)
		commit('setPartnership', response.data)
		return Promise.resolve()
	})
}