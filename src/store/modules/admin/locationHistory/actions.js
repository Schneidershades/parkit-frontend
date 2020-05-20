import axios from 'axios'
import { localForageService } from '../dispatchApi/localForageService'

export const getLocationHistory = ({ commit }) => {
	return axios.get('api/v1/admin/user/order/history').then((response) => {
		commit('setLocationHistory', response.data.data)
        localForageService.setItem('history', response.data.data)
		return Promise.resolve()
	})
}
