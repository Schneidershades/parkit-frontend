import { date } from 'quasar'

export const orderDetails = (state) => {
	return state.orderDetails
}

export const orders = (state) => {
	return state.orders
}

export const paymentDetails = (state) => {
	return state.paymentDetails
}

export const paymentTimeout = (state) => {
	return state.paymentTimeout 
}

// products
export const receiptNumber = (state) => {
	return state.receiptOrderNumber
}

export const editPrivilege = (state) => {
	return state.editPrivilege 
}

export const deletePrivilege = (state) => {
	return state.deletePrivilege 
}

export const usersWithRights = (state) => {
	return state.usersWithRights 
}

export const transaction = (state) => {
	return state.transaction 
}

export const totalTransaction = (state) => {
	return state.orders.reduce(function(total, item){
	    return parseInt(total) + parseInt(item.total); 
	},0);	
}

export const totalTransactionToday = (state) => {
	var today = new Date();
	var bu = today.getDate();
	var timeStamp = Date.now()
	console.log(timeStamp)
	var formattedString = date.formatDate(timeStamp, 'YYYY-MM-DD')

	var orders = state.orders.filter(x => x.status == 'complete' || x.status == 'pending' || x.status == 'processing' && x.date == formattedString)
	// return formattedString
	// return state.orders.reduce(function(total, item){
	// 	if(item.date == formattedString){
	// 		return parseInt(total) + parseInt(item.total); 
	// 	}
	    
	// },0);

	var arraySum = orders.reduce((a, b) => {
		// console.log(b.total)
		return parseInt(a) + parseInt(b.total)

	}, 0)

	return arraySum	
}

export const totalTransactionThisMonth = (state) => {
	var today = new Date();
	var bu = today.getDate();
	var timeStamp = Date.now()
	var formattedString = date.formatDate(timeStamp, 'YYYY-MM-DD')
	return state.orders.reduce(function(total, item){
		if(item.date == formattedString){
			return parseInt(total) + parseInt(item.total); 
		}
	    
	},0);	
}
