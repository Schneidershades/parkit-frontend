import axios from 'axios'
import { localForageService } from '../dispatchApi/localForageService'
import { LocalStorage } from 'quasar'

export const getLocationHistory = async ({state, commit, rootState }, item) => {
	var parameter = null

	if(item!=null){
		parameter = item;
	}else{
		var user = JSON.parse(LocalStorage.getItem('user'))
		parameter = user ? user.location.id : null
	}

	if(parameter==null){
		return console.log('user location not found')
	}

	await axios.get('api/v1/admin/user/location-history/' + user.location.id).then((response) => {
		console.log(response.data.data)
		commit('setLocationHistory', response.data.data)
        localForageService.setItem('history', response.data.data)
		return Promise.resolve()
	})
}
