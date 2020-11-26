import Vue from 'vue'
import Vuex from 'vuex'

const isOnline = require('is-online');
Vue.use(Vuex)

import state from './state'
import *  as getters from './getters'
import *  as mutations from './mutations'
import *  as actions from './actions'

import auth from './modules/auth/auth'

// general resources online needed  activities
import location from './modules/general/location'
import country from './modules/general/country'
import errorbag from './modules/general/errorbag'
import internetStatus from './modules/general/internetStatus'

// website application for visitors
import content from './modules/visitors/content'
import contact from './modules/visitors/contact'

// users activities
import orders from './modules/users/orders'
import shopping from './modules/users/shopping'
import address from './modules/users/address'

// desktop application
import plate_number from './modules/desktop/plateNumber'
import reportFaults from './modules/desktop/reportFaults'
import complaintsAndSuggestions from './modules/desktop/complaintsAndSuggestions'
import personnelRequests from './modules/desktop/personnelRequests'
import requisitionOrders from './modules/desktop/requisitionOrders'
import purchaseOrders from './modules/desktop/purchaseOrders'
import onlineTransaction from './modules/desktop/onlineTransaction'
import customerPlateNumbers from './modules/desktop/customerPlateNumbers'
import locationHistory from './modules/desktop/locationHistory'
import adminShopping from './modules/desktop/adminShopping'
import adminOrders from './modules/desktop/adminOrders'
import accountClassification from './modules/desktop/account/accountClassification'
import accountLocation from './modules/desktop/account/accountLocation'
import users from './modules/desktop/users'
import roles from './modules/desktop/roles'
import offlineOrders from './modules/desktop/offlineOrders'

// web admin application
import webAdminOrders from './modules/webAdmin/webadminorders'
import webAdminShopping from './modules/webAdmin/webAdminShopping'

// shared component application
import shareReport from './modules/share/report'
import priviledge from './modules/share/priviledge'
import vehicles from './modules/share/vehicles'
import packages from './modules/share/packages'
import vehiclePackageRates from './modules/share/vehiclePackageRates'
import locationSettings from './modules/share/locationSettings'
import geolocation from './modules/share/geolocation'
import discounts from './modules/share/discounts'
import coupons from './modules/share/coupons'
import expenseOrders from './modules/share/expenseOrders'
import employees from './modules/share/employees'
import staff from './modules/share/staff'
import dashboard from './modules/share/dashboard'

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
		content,
		contact,
		country,
		internetStatus,

		plate_number,
		reportFaults,
		complaintsAndSuggestions,
		personnelRequests,
		requisitionOrders,
		purchaseOrders,
		onlineTransaction,
		customerPlateNumbers,
		locationHistory,
		adminShopping,
		adminOrders,
		errorbag,
		accountClassification,
		accountLocation,
		users,
		roles,
		offlineOrders,

		// admin
		webAdminOrders,
		webAdminShopping,

		// share
		shareReport,
		priviledge,
		vehicles,
		vehiclePackageRates,
		locationSettings,
		geolocation,
		discounts,
		coupons,
		expenseOrders,
		employees,
		staff,
		dashboard,
	},
})



require('./modules/desktop/dispatchApi/subscriber.js')
require('./modules/desktop/dispatchApi/persistencePlugin.js')
require('./modules/desktop/dispatchApi/roles.js')
// require('./modules/auth/prefetchData.js')