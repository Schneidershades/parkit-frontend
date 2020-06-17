import axios from 'axios'

// get products
export const getStaffPurchaseOrders = ({ commit, dispatch, rootState }) => {
	var URL = 'api/v1/admin/user/staff-purchase-orders'
	return axios.get(URL).then((response) => {
		console.log(response.data)
		commit('setReportFaults', response.data)
		return Promise.resolve()
	}).catch((error) => {
		if (!error.response) {
    		dispatch('internetStatus/setConnection', false, {root:true})
	        return dispatch('flashErrorMessage', "No Internet Connection Available", {root:true})
        }
  		return Promise.reject()
  	})
}

export const sendStaffPurchaseOrders = ({ commit, dispatch, rootState }, information) => {
	var URL = 'api/v1/admin/user/staff-purchase-orders'
	return axios.post(URL, information).then((response) => {
		console.log(response.data)
		return Promise.resolve()
	})
}