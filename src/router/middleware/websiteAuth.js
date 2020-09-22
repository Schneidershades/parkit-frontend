export default function websiteAuth({ next, store }){

 	if(store.state.auth.user == null && process.env.MODE == 'ssr'){
		return next({
			name: 'home'
		})
	}

	if(store.state.auth.user.role != 'user' && process.env.MODE != 'ssr'){
		return next({
			name: 'desktopDashboard'
		})
	}

	return next()
}