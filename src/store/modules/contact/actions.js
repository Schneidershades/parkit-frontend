import axios from 'axios'

export const sendContactUsEmail = ({ commit }, credentials) => {
	return axios.post('api/send/contact', credentials).then((response) => {
		console.log(response.data)
		commit('setContact', response.data)
		return Promise.resolve()
	})
}

export const sendTrainingAndConsultancyEmail = ({ commit }, credentials) => {
	return axios.post('api/send/training-consultancy', credentials).then((response) => {
		console.log(response.data)
		commit('setTrainingAndConsultancy', response.data)
		return Promise.resolve()
	})
}

export const sendCareerEmail = ({ commit }, credentials) => {
	console.log(credentials)
	return axios.post('api/send/careers', credentials, 
            {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }
        ).then((response) => {
			console.log(response.data)
			commit('setCareers', response.data)
			return Promise.resolve()
	})
}

export const sendPartnerEmail = ({ commit }, credentials) => {
	return axios.post('api/send/partnership', credentials).then((response) => {
		console.log(response.data)
		commit('setPartnership', response.data)
		return Promise.resolve()
	})
}