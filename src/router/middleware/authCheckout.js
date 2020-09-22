export default function checkout({ next, store }){

	if(store.state.auth.user == null){
		return next({
			name: 'cart'
		})
	}

	if(store.state.auth.user.role == 'user'){
		return next({
			name: 'userCart'
		})
	}
	return next()
}