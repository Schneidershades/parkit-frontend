export const setOrderDetails = (state, order) =>{
	state.orderDetails = order
}

export const setOrders = (state, order) =>{
	state.orders = order
}

export const setPaymentDetails = (state, details) =>{
	state.paymentDetails = details
}

export const setPaymentTimeout = (state, { callback, delay }) =>{
	state.paymentTimeout = setTimeout(callback, delay)
}

export const stopPaymentTimeout = (state) =>{
	clearInterval(state.setTimeout)
	state.paymentTimeout = null
}

export const updateTransaction = (state, order) =>{
	state.transaction = order
	state.orders.push(state.transaction)
}

export const setOrder = (state, order) =>{
	state.orders.push(order)
}

export const setCurrentOrders = (state, orders) =>{
	state.orders = orders
}

export const setNewOrderNumber = (state, no) =>{
	state.receiptOrderNumber = no
}

export const clearOrder = (state) =>{
	state.transaction = null
}


export const setUpdateOrderDetails = (state, order) =>{
	console.log(order.action)
	var item = state.orders.find(item => item.receipt_number === order.orderDetails.receipt_number)

	if(order.action == 'complete'){
		item.status = 'completed'
	}

	if(order.action == 'edit'){
		item.status = 'edit'
		item.reason = order.reason
	}

	if(order.action == 'delete'){
		item.status = 'delete'
		item.reason = order.reason
	}

}

export const setUsersWithRight = (state, data) => {
	state.usersWithRights = data
	return 
}

export const setCurrentUserEditRight = (state, data) => {
	state.editPrivilege = data
	return 
}

export const setCurrentUserDeleteRight = (state, data) => {
	state.deletePrivilege = data
	return 
}

export const setSignedInaUserWithEditPrivilege = (state, data) =>{
	state.editPrivilege = data
	return 
}

export const setSignedInaUserWithDeletePrivilege = (state, data) => {
	state.deletePrivilege = data
	return 
}