import { Platform } from 'quasar'
import { LocalStorage } from 'quasar'
import localforage from 'localforage';

export default{
	products: [],
	offlinePackages: [],
	cart: LocalStorage.getItem('cart') ? JSON.parse(LocalStorage.getItem('cart')) : [],
	percentageDiscount : 0,
	amountDiscount : 0,
	couponDetails: null,
	discountDetails: null,
	userDiscountPriviledge: null,
	usersWithDiscountPriviledge: [],
}