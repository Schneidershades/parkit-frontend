import { localForageService } from '../dispatchApi/localForageService'

export default{
	orders: localForageService.getItem('orders') != undefined ? localForageService.getItem('orders') : [],
	order: null,
}