import { Platform } from 'quasar'

export default function auth({ next, store }){
	// if(!Platform.is.electron || !Platform.is.mobile){
	// 	return next({
	// 		name: 'home'
	// 	})
	// }
	return next()
}