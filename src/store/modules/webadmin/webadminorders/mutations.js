export const setOrderDetails = (state, order) =>{
	state.orderDetails = order
}

export const setOrders = (state, orders) =>{
	state.orders = orders
}

export const setPendingOrders = (state, order) =>{
	state.setPendingOrders = order
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

export const setOrder = (state, orders) =>{
	state.setOrderDetails = orders
}