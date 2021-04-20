export default function auth({ next }){

	if(process.env.MODE == 'mobile'){
		return next({
			name: 'mob'
		})
	}

	if(process.env.MODE != 'ssr'){
		return next({
			name: 'adminLogin'
		})
	}
	return next()
}

