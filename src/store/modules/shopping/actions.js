import axios from 'axios'
import { LocalStorage, SessionStorage } from 'quasar'

// get products
export const getProducts = ({ commit }) => {
	return axios.get('api/vehicles').then((response) => {
		commit('setProducts', response.data)
		return Promise.resolve()
	})
}

export const getCart = async ({ commit }) => {
	// console.log('get')
	await axios.get('api/cart').then((response) => {
		// console.log(response.data.data.products)
		commit('setCart', response.data.data.products)
		return Promise.resolve()
	})
}


// add product to cart
export const addProductToCart = ({ commit, dispatch, rootState }, productsItems) =>{
	
	var items = [{
		id: productsItems,
		quantity: 1
	}]

	commit('appendToCart', {
		items
	})
	// api
	
	// check if module auth state is authenticated
	let auth = rootState.auth.user

	// store notes
	if(auth){
		var products = [{
			id: productsItems.id,
			quantity: 1
		}]
		// console.log(productsItems)

		return axios.post('api/cart', {
			products
		});

		dispatch('getCart')

	}else{
		dispatch('storeCart')
	}
	
}

export const storeCart = ({ state, rootState }) =>{
	let auth = rootState.auth.user

	if(!auth){
		// console.log(auth)
		
		LocalStorage.set('cart', JSON.stringify(state.cart))
	}else{
		var types = state.cart

		if(types != [] || types != null){
			// console.log(types)
			var obj = types.map(function(item){
			  return {id : item["id"], quantity : item["quantity"]}
			});

			// console.log('products')
			// console.log(obj)

			if(obj === undefined || obj.length == 0){
				// console.log('none')
				
			}else{
				var products = obj
				// console.log(obj)

				axios.post('api/cart', {
					products
				});

				return LocalStorage.remove('cart');

				// return dispatch('getCart')
			}			
		}
	}	
}

export const storeCartFromSession = ({ state }) =>{
	
	var types = state.cart
	// var types = payload
	// console.log(types)
	if(types != [] || types != null){
		// console.log('good')
		var results = types.map(function(item){
		  return {id : item["id"], quantity : item["quantity"]}
		});

		// console.log(results)

		return axios.post('api/cart', {
			results
		});

		// localStorage.removeItem('cart')

		LocalStorage.set('cart', [])

		dispatch('getCart')
	}
}


// remove product from cart
export const removeProductFromCart = ({commit, dispatch, rootState }, productId) =>{
	commit('removeFromCart', productId)

	// check if module auth state is authenticated
	let auth = rootState.auth.user

	if(auth){
		return axios.delete(`api/cart/${productId}`)
		
		dispatch('getCart')
	}else{
		dispatch('storeCart')
	}	
}


// remove all from our cart 
export const removeAllProductFromCart = ({ commit, dispatch, rootState }, ) =>{
	commit('clearCart')

	let auth = rootState.auth.user
	if(auth){
		return axios.get('api/empty-cart');
		dispatch('getCart')
	}else{
		dispatch('storeCart')
	}
}

export const removeAllProductFromCartLocalStorage = ({ commit } ) =>{
	commit('clearCart')
}


export const updateCartTotals = ({ commit, dispatch, rootState }, items) =>{
	// console.log(items[0].id)
	var apianWayId = items[0].id.id
	var quantity = items[0].quantity

	commit('updateToCart', {
		items
	})
	
	// check if module auth state is authenticated
	let auth = rootState.auth.user

	// store notes
	if(auth){
		var cartURL = 'api/cart/' + apianWayId
		return axios.patch(cartURL, {quantity : quantity})
	}else{
		dispatch('storeCart')
	}
}


export const applyCoupon = async ({ commit }, items) =>{
	var couponURL = 'api/coupons/' + items
	await axios.get(couponURL).then((response) => {
		// console.log(response.data.data)
		commit('updateCouponData', response.data.data)
		return Promise.resolve()
	}).catch((error) => {
		// console.log(error.response.data)
        // commit('updateCouponData', null)
        return Promise.reject()
    }) 
}

export const applyCustomerDiscount = async ({ commit }, items) =>{
	// console.log(items)
	await axios.post('api/admin/user/customer-discounts', items).then((response) => {
		// console.log(response.data.data)
		commit('updateDiscountData', response.data.data)
		return Promise.resolve()
	}).catch((error) => {
		// console.log(error.response.data)
        // commit('updateDiscountData', null)
        return Promise.reject()
    }) 
}


export const applyResetDiscount = async ({ commit }) =>{
	return commit('applyResetDiscountData')
}

export const setUserDiscountPriviledge = async ({ commit }, items) =>{
	// console.log(items)
	return commit('setUserDiscountPriviledge', items)
}

export const getUsersWithDiscountPriviledge = async ({ commit }) =>{
	// console.log(items)
	await axios.get('api/admin/user/permission/discounts').then((response) => {
		// console.log(response.data)
		commit('setUsersWithDiscountPriviledge', response.data)
		return Promise.resolve()
	}).catch((error) => {
		// console.log(error.response.data)
        // commit('updateDiscountData', null)
        return Promise.reject()
    }) 
}

export const signInaUserWithDiscountPriviledge = async ({ commit }, items) =>{
	// console.log(items)
	await axios.post('api/admin/user/permission/authorize', items).then((response) => {
		// console.log(response.data.data)
		commit('setSignedInaUserWithDiscountPriviledge', response.data.data)
		return Promise.resolve()
	}).catch((error) => {
		// console.log(error.response.data)
        // commit('updateDiscountData', null)
        return Promise.reject()
    }) 
}

export const defaultDiscountToZeroOnLocationManagerApp = async ({ commit }) =>{
	return commit('setDefaultDiscountToZeroOnLocationManagerApp')
}

export const defaultDiscountOnWeb = async ({ commit }) =>{
	return commit('setDefaultDiscountOnWeb')
}

