export default function checkout({ next, store }){
	if(store.state.auth.user){
		return next({
			name: 'userCart'
		})
	}
	return next()
}