import { Platform } from 'quasar'

export default function auth({ next, store }){
	// console.log(Platform.is.electron)
<<<<<<< HEAD
	
	// const platform = process.env.SERVER ? Platform.parseSSR(ssrContext) : Platform
	// if(Platform.is.electron){
	// 	return next({
	// 		name: 'adminLogin'
	// 	})
	// }

	
	return next()
}

=======
	if(Platform.is.electron){
		return next({
			name: 'adminLogin'
		})
	}
	return next()
}
>>>>>>> parent of 3be25e0... updates
