import axios from 'axios'

export const getLocationEmployees = ({ commit }) => {
	return axios.get('api/v1/admin/user/location-employees').then((response) => {
		console.log(response.data)
		commit('setEmployees', response.data.data)
		return Promise.resolve()
	})
}

export const getAllEmployees = ({ commit }) => {
	return axios.get('api/v1/admin/user/employees').then((response) => {
		console.log(response.data)
		commit('setEmployees', response.data.data)
		return Promise.resolve()
	})
}

export const postEmployee = ({ commit, dispatch }, credentials) => {
	return axios.post('api/v1/admin/user/employees', credentials).then((response) => {
		return Promise.resolve()
	})
}

export const selectEmployee = ({ commit }, payload) => {
	commit('setSelectedEmployee', payload)
	return Promise.resolve()
}

export const updateEmployee = ({ commit, dispatch }, credentials) => {
	var url = 'api/v1/admin/user/employees/' + credentials.id
	return axios.put(url, credentials).then((response) => {
		return Promise.resolve()
	})
}

export const getEmployeeLoansAndOutstandings = ({ commit, dispatch }, payload) => {
	return axios.get('api/v1/admin/user/employee-loans-and-outstanding/' + payload.id).then((response) => {
		commit('setEmployeeLoansAndOutstanding', response.data.data)
		return Promise.resolve()
	})
}

export const postEmployeeLoansAndOutstandings = ({ commit, dispatch }, payload) => {
	return axios.post('api/v1/admin/user/employee-loans-and-outstanding', payload).then((response) => {
		console.log(payload.expense_orderable_id)
		dispatch('getEmployeeLoansAndOutstandings', { id: payload.expense_orderable_id })
		return Promise.resolve()
	})
}

export const getEmployeePenaltiesAndDeductions = ({ commit, dispatch }, payload) => {
	return axios.get('api/v1/admin/user/employee-penalties-and-deductions/' + payload.id).then((response) => {
		commit('setEmployeePenaltiesAndDeductions', response.data.data)
		return Promise.resolve()
	})
}

export const postEmployeePenaltiesAndDeductions = ({ commit, dispatch }, payload) => {
	return axios.post('api/v1/admin/user/employee-penalties-and-deductions', payload).then((response) => {
		dispatch('getEmployeePenaltiesAndDeductions', { id: payload.expense_orderable_id })
		return Promise.resolve()
	})
}



