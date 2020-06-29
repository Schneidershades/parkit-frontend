export default function websiteAuth({ next, store }){
 	if(store.state.auth.user == null){
		return next({
			name: 'home'
		})
	}

	// if(store.state.auth.user.role != 'user'){
	// 	return next({
	// 		name: 'adminLogin'
	// 	})
	// }

	return next()
}