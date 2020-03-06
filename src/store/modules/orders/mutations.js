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