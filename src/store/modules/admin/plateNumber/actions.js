import axios from 'axios'

// get products
export const getPlateNumber = async ({ commit }, plate) => {
	var plateURL = 'api/v1/admin/user/customer/plate_number/' + plate
	await axios.get(plateURL).then((response) => {
		console.log(response.data.data)
		commit('setPlateNumber', response.data.data)
		return Promise.resolve()
	}).catch((error) => {
		console.log(error.response.data)
        // commit('updateDiscountData', null)
        return Promise.reject()
    }) 
}

export const updateCustomer = async ({ commit }, items) =>{
	// console.log(items)
	await axios.put('api/v1/admin/user/customer/plate_number/0 ', items).then((response) => {
		console.log(response.data.data)
		commit('setPlateNumber', response.data.data)
		return Promise.resolve()
	}).catch((error) => {
		console.log(error.response.data)
        // commit('updateDiscountData', null)
        return Promise.reject()
    }) 
}