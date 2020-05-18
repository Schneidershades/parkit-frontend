import axios from 'axios'

// get products
export const setConnection = ({ commit, dispatch, rootState}, payload) => {
	console.log(payload)
	commit('setConnection', payload)

	if(payload != false ){
        return dispatch('adminOrders/sendOfflineOrders', null, { root: true })
    }

}
