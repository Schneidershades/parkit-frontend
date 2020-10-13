import axios from 'axios'
import { LocalStorage } from 'quasar'

export const getLocationDashboard = ({ commit }, item) => {
	let user = JSON.parse(LocalStorage.getItem('user'))

	if(item){
		var URL = 'api/v1/admin/user/location-dashboard/'+ item
	}else{
		var URL = 'api/v1/admin/user/location-dashboard/'+ user.location.id
	}
	
	
	return axios.get(URL).then((response) => {
		console.log(response.data)
		LocalStorage.set('locationDashboard', JSON.stringify(response.data.data.message))
		commit('setDashboard', JSON.parse(LocalStorage.getItem('locationDashboard')))
		return Promise.resolve()
	})
	
}

export const getBirthdayLocationDashboard = ({ commit }, item) => {
	let user = JSON.parse(LocalStorage.getItem('user'))

	// store notes
	if(!user){
		return console.log('user location not found')
	}
	
	var URL = 'api/v1/admin/user/birthday-location/'+ user.location.id
	
	return axios.get(URL).then((response) => {
		console.log(response.data)
		LocalStorage.set('locationDashboard', JSON.stringify(response.data.data.message))
		commit('setDashboard', JSON.parse(LocalStorage.getItem('locationDashboard')))
		return Promise.resolve()
	})
	
}