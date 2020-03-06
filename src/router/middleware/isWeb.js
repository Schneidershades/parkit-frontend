import { Platform } from 'quasar'

export default function auth({ next, store }){
	// console.log(Platform.is.electron)
	if(Platform.is.electron){
		return next({
			name: 'adminLogin'
		})
	}
	return next()
}