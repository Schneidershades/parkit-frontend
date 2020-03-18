import { Platform } from 'quasar'
import { LocalStorage, SessionStorage } from 'quasar'

export default{
	products:[],
	cart: LocalStorage.getItem('cart') ? JSON.parse(LocalStorage.getItem('cart')) : [],
	percentageDiscount : 0,
	amountDiscount : 0,
	couponDetails: null,
	discountDetails: null,
	userDiscountPriviledge: null,
	usersWithDiscountPriviledge: [],
}