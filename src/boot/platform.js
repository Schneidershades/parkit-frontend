import store from 'app/src/store/index'
import { Platform } from 'quasar'
import { LocalStorage, SessionStorage } from 'quasar'


export default async ({ app, router, store, Vue, ssrContext, urlPath, redirect }) => {
  	// something to do
  	const platform = process.env.SERVER
    ? Platform.parseSSR(ssrContext)
    : Platform

    // console.info(platform.is.electron)
    console.info(platform)

    if(platform.is.electron == false){
    	return store.commit('shopping/setDefaultDiscountOnWeb', 10, { root: true })
    }else{
    	return router.push({name: 'adminLogin'})
    }
}
