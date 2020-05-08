import Vue from 'vue'

import Vuex from 'vuex'

Vue.use(Vuex)


import state from './state'
import *  as getters from './getters'
import *  as mutations from './mutations'
import *  as actions from './actions'

import auth from './modules/auth/auth'
import shopping from './modules/shopping'
import location from './modules/location'
import address from './modules/address'
import packages from './modules/packages'
import orders from './modules/orders'
import content from './modules/content'
import contact from './modules/contact'
import country from './modules/country'
import internetStatus from './modules/internetStatus'

import plateNumber from './modules/admin/plateNumber'
import offlineOrders from './modules/admin/offlineOrders'
import reportFaults from './modules/admin/reportFaults'
import complaintsAndSuggestions from './modules/admin/complaintsAndSuggestions'
import personnelRequests from './modules/admin/personnelRequests'
import requisitionOrder from './modules/admin/requisitionOrders'
import purchaseOrders from './modules/admin/purchaseOrders'
import onlineTransaction from './modules/admin/onlineTransaction'
import customerPlateNumbers from './modules/admin/customerPlateNumbers'
import locationHistory from './modules/admin/locationHistory'
import adminShopping from './modules/admin/adminShopping'
import adminOrders from './modules/admin/adminOrders'

// import adminAuth from './modules/admin/adminAuth'

import accountClassification from './modules/admin/account/accountClassification'
import accountLocation from './modules/admin/account/accountLocation'

import users from './modules/admin/users'

import roles from './modules/admin/roles'

import createPersistedState from 'vuex-persistedstate'

import VuexPersist from 'vuex-persist';

export default new Vuex.Store({
	state,
	getters,
	mutations:{
		initialize(state, persistedState) {
			// console(state)
		    // use the fetched, persisted state.
		    // In my case, I was reconstructing an array, so I wrote a handler (overwriteStore) to deal with the data rather simplistically
		    overwriteStore(state, { state }); // but do your own thing here.

		    console.log(state)
		    Vue.set(state, 'initialized', true);
	   },
	},
	actions,
	modules:{
		auth,
		shopping,
		location,
		address,
		packages,
		orders,
		offlineOrders,
		content,
		contact,
		country,
		internetStatus,
		adminShopping,
		adminOrders,

		// plateNumber,
		reportFaults,
		complaintsAndSuggestions,
		personnelRequests,
		requisitionOrder,
		purchaseOrders,
		onlineTransaction,
		customerPlateNumbers,
		locationHistory,

		accountClassification,
		accountLocation,

		users,
		roles,
	},
})



require('./modules/admin/dispatchApi/subscriber.js')
require('./modules/admin/dispatchApi/roles.js')
require('./modules/admin/dispatchApi/persistencePlugin.js')
// require('./modules/auth/prefetchData.js')