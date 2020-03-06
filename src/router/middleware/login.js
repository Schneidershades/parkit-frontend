export default function auth({ next, store }){
 	if(store.getters["auth/authenticated"] != null){
		return next({
			name: 'adminLogin'
		})
	}

	return next()
}