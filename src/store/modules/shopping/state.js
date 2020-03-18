import { Platform } from 'quasar'

export default{
	products:[],
	cart: JSON.parse(localStorage.getItem('cart')) || [],
	percentageDiscount : Platform.is.electron ? 0 : 10,
	amountDiscount : 0,
	couponDetails: null,
	discountDetails: null,
	userDiscountPriviledge: null,
	usersWithDiscountPriviledge: [],
}