export default function auth({ next, store }){
	if(!store.getters["auth/authenticated"].role.){
		return next({
			name: 'home'
		})
	}

	return next()
}