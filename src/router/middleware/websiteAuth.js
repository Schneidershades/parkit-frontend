export default function websiteAuth({ next, store }){
 	if(store.state.auth.user == null){
		return next({
			name: 'home'
		})
	}

	return next()
}