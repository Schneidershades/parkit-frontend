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
import offlinedb from './modules/offlinedb'

import plateNumber from './modules/admin/plateNumber'
import reportFaults from './modules/admin/reportFaults'
import complaintsAndSuggestions from './modules/admin/complaintsAndSuggestions'
import personnelRequests from './modules/admin/personnelRequests'
import requisitionOrder from './modules/admin/requisitionOrders'
import purchaseOrders from './modules/admin/purchaseOrders'
import onlineTransaction from './modules/admin/onlineTransaction'

export default new Vuex.Store({
	state,
	getters,
	mutations,
	actions,
	modules:{
		auth,
		shopping,
		location,
		address,
		packages,
		orders,
		offlinedb,
		content,


		plateNumber,
		reportFaults,
		complaintsAndSuggestions,
		personnelRequests,
		requisitionOrder,
		purchaseOrders,
		onlineTransaction,
	}
})


require('./modules/auth/subscriber.js')
require('./modules/auth/roles.js')