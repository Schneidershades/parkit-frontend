import axios from 'axios'
import { localForageService } from '../dispatchApi/localForageService'
import { LocalStorage } from 'quasar'

export const getLocationHistory = ({state, commit, rootState }) => {
	let user = state.userDetails

	if(!navigator.onLine){
		console.log('offline now')
		return
	}else{
		console.log('online now')
	}

	if(!user){
		console.log(user.location.id)
		console.log('login now')
		return
	}
	
	return axios.get('api/v1/admin/user/location/history/' + user.location.id).then((response) => {
		console.log(response.data.data)
		commit('setLocationHistory', response.data.data)
        localForageService.setItem('history', response.data.data)
		return Promise.resolve()
	})
}
