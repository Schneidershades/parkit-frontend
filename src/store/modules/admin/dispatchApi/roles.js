import Vue from 'vue'
import { Can, abilitiesPlugin } from '@casl/vue'
import { AbilityBuilder } from '@casl/ability'
import store from 'app/src/store/index'
import axios from 'axios'
import { localForageService } from './localForageService'

Vue.component('Can', Can)


store.watch(
    (state, getters) => getters['auth/user'],
    isAuth => {

      	if (isAuth) {

			const testOffline = async () => {
				axios.defaults.baseURL = 'http://localhost:8000/'
				// axios.defaults.baseURL = 'https://api.parkit.ng/'
			  	await store.dispatch('adminShopping/getProducts')
		  		await store.dispatch('customerPlateNumbers/getPlateNumbers')
			  	await store.dispatch('adminOrders/checkRecieptNumber')
				await store.dispatch('locationHistory/getLocationHistory')
			}

			// async function returns a promise
			testOffline().then(() => {
				console.log('AUTHENTICATED ACTIONS')
			})


         	var user = store.getters['auth/user']

			let abilities =  AbilityBuilder.define(can => {
				user.permissions.forEach((permission)=>{
					can(...permission)
				})
			})

			Vue.use(abilitiesPlugin, abilities)
      	}else{

      	}
    }
)



// 

