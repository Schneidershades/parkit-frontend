import { Platform } from 'quasar'

export default function auth({ next, store, ssrContext}){
	// console.log(Platform.is.electron)
	
	// const platform = process.env.SERVER ? Platform.parseSSR(ssrContext) : Platform
	// if(Platform.is.electron){
	// 	return next({
	// 		name: 'adminLogin'
	// 	})
	// }

	
	// return next()
}

