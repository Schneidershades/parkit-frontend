export default function auth({ next, store }){
	if(!store.getters["auth/user"].role.){
		return next({
			name: 'home'
		})
	}

	return next()
}