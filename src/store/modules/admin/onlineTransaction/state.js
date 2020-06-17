import { LocalStorage } from 'quasar'
import localforage from 'localforage';
import { localForageService } from '../dispatchApi/localForageService'

export default{
	transactions: null,
	transactionDetails: null,
	onlineBooking: localForageService.getItem('onlineBookings') !== undefined ? localForageService.getItem('onlineBookings') : [],
}