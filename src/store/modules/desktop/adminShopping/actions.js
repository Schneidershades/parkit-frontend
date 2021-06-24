import axios from 'axios'
import { LocalStorage } from 'quasar'
import { localForageService } from '../dispatchApi/localForageService'

// get products
export const getProducts = ({ commit, dispatch, rootState }, item) => {

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

	return axios.get('api/v1/admin/user/location-vehicles/' + user.location.id).then((response) => {
		console.log(response.data.data)
		commit('setProducts', response.data)
		return Promise.resolve()
	}).catch(() => {
		console.log(error.response.data)
        console.log('none')
    })
}

// add product to cart
export const addProductToCart = ({ commit, dispatch }, productsItems) =>{

	var items = [{
		id: productsItems,
		quantity: 1
	}]

	commit('appendToCart', {
		items
	})

	dispatch('storeCart')	
}

export const getCart = ({ state, commit }) => {
	LocalStorage.set('cart', JSON.stringify(state.cart))
	commit('setCart', state.cart)
}

export const storeCart = ({ state, commit}) =>{
	LocalStorage.set('cart', JSON.stringify(state.cart))
	commit('setCart', state.cart)
}

export const storeCartFromSession = ({ state }) =>{

	var types = state.cart
	if(types != [] || types != null){
		var results = types.map(function(item){
		  return {id : item["id"], quantity : item["quantity"]}
		});

		return axios.post('api/v1/cart', {
			results
		});

		LocalStorage.set('cart', [])

		dispatch('getCart')
	}
}


// remove product from cart
export const removeProductFromCart = ({commit, dispatch }, productId) =>{
	commit('removeFromCart', productId)
	dispatch('storeCart')
}


// remove all from our cart 
export const removeAllProductFromCart = ({ commit, dispatch }) =>{
	commit('clearCart')
	dispatch('storeCart')
}

export const removeAllProductFromCartLocalStorage = ({ commit, dispatch  }) =>{
	commit('clearCart')
	dispatch('storeCart')
}


export const updateCartTotals = ({ commit, dispatch }, items) =>{
	var apianWayId = items[0].id.id
	var quantity = items[0].quantity

	commit('updateToCart', {
		items
	})
	dispatch('storeCart')
}


export const applyCoupon = async ({ commit }, items) =>{
	var couponURL = 'api/v1/coupons/' + items
	await axios.get(couponURL).then((response) => {
		// console.log(response.data.data)
		commit('updateCouponData', response.data)
		return Promise.resolve()
	}).catch(() => {
        console.log('none')
    })
}

export const applyCustomerDiscount = async ({ commit }, items) =>{
	// console.log(items)
	await axios.post('api/v1/admin/user/customer-discounts', items).then((response) => {
		// console.log(response.data.data)
		commit('updateDiscountData', response.data)
		return Promise.resolve()
	}).catch(() => {
        console.log('none')
    })
}


export const applyResetDiscount = async ({ commit }) =>{
	return commit('applyResetDiscountData')
}

export const setUserDiscountPrivilege = async ({ commit }, items) =>{
	// console.log(items)
	return commit('setUserDiscountPrivilege', items)
}


export const signInaUserWithDiscountPrivilege = async ({ commit }, items) =>{
	// console.log(items)
	await axios.post('api/v1/admin/user/permission/authorize', items).then((response) => {
		commit('setSignedInaUserWithDiscountPrivilege', response.data)
		return Promise.resolve()
	}).catch(() => {
        console.log('none')
    })
}

export const getUsersWithDiscountPrivilege = async ({ commit }) =>{
	// console.log(items)
	await axios.get('api/v1/admin/user/permission/discounts').then((response) => {
		commit('setUsersWithDiscountPrivilege', response.data)
		return Promise.resolve()
	}).catch(() => {
        console.log('none')
    })
}

export const getUsersWithRight = async ({ commit }, item) =>{
	await axios.post('api/v1/admin/user/check-permission', {'permission' : item}).then((response) => {
		console.log(response.data)
		commit('setUsersWithDiscountPrivilege', response.data)
		return Promise.resolve()
	}).catch(() => {
        console.log('none')
    })
}

export const defaultDiscountToZeroOnLocationManagerApp = async ({ commit }) =>{
	return commit('setDefaultDiscountToZeroOnLocationManagerApp')
}

export const defaultDiscountOnWeb = async ({ commit }) =>{
	return commit('setDefaultDiscountOnWeb')
}

