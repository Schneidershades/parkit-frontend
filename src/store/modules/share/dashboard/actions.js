import axios from 'axios'

export const getLocationDashboard = ({ commit }, item) => {
	if(item == null){
		return 
	}

	var URL = 'api/v1/admin/user/location-dashboard/'+ item
	
	return axios.get(URL).then((response) => {
		console.log(response.data)
		LocalStorage.set('locationDashboard', JSON.stringify(response.data.data))
		commit('SET_USER', JSON.parse(LocalStorage.getItem('locationDashboard')))
		commit('setDashboard', response.data.data)
		return Promise.resolve()
	})
	
}