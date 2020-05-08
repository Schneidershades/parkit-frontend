import { LocalStorage } from 'quasar'

export default{
	orders: LocalStorage.getItem('orders') ? JSON.parse(LocalStorage.getItem('orders')) : [],
	receiptOrderNumber: LocalStorage.getItem('receiptOrderNumber') ? JSON.parse(LocalStorage.getItem('receiptOrderNumber')) : 0,
	orderDetails:[],
	paymentDetails:[],
	paymentTimeout :null,
}