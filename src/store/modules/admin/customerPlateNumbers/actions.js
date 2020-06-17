import axios from 'axios'
import { localForageService } from '../dispatchApi/localForageService'
import { LocalStorage } from 'quasar'
const isOnline = require('is-online');

// get products
export const getPlateNumbers = ({ commit, rootState }) => {
	return axios.get('api/v1/admin/user/customers-plate-numbers').then((response) => {
		console.log(response.data.data)
		commit('setPlateNumbers', response.data)
		return Promise.resolve()
	})
}

export const checkPlateNumber = ({state, commit, dispatch, rootState }, plateNumber) =>{
	commit('setPlateNumber', plateNumber)
	LocalStorage.set('plateNumber', JSON.stringify(state.plateNumber))

	dispatch('checkFreeWash')
}

export const checkFreeWash = async ({state, commit, dispatch }) =>{

	var free = {data: {id: "free", percentageDiscount: "100", amountDiscount: 0}}

	if(state.freeWash==true){
		dispatch('adminShopping/removeAllProductFromCartLocalStorage', null , { root: true })
		commit('adminShopping/updateDiscountData', free , { root: true })
	}else{
		commit('adminShopping/applyResetDiscountData', null, { root: true })
	}
}

export const updateCustomer = async ({state, commit, dispatch }, items) =>{
	commit('updatePlateNumber', items)
	LocalStorage.set('plateNumber', JSON.stringify(state.plateNumber))
	dispatch('checkFreeWash')
}

export const removeCurrentPlateNumberFromLocalStorage = ({ commit } ) =>{
	commit('clearPlateNumber')
	LocalStorage.set('plateNumber', null)
}


export const useFreeWash = ({ commit,  dispatch, rootState }, item) =>{
	commit('setFreeWashStatus', item)

	var free = {data: {id: "free", percentageDiscount: "100", amountDiscount: 0}}

	if(item=='yes'){
		dispatch('adminShopping/removeAllProductFromCartLocalStorage', null , { root: true })
		commit('adminShopping/updateDiscountData', free , { root: true })
	}else{
		commit('adminShopping/applyResetDiscountData', null, { root: true })
	}
}

