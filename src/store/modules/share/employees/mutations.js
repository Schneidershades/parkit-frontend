export const setEmployees = (state, payload) =>{
	state.employees = payload
}

export const setSelectedEmployee = (state, payload) =>{
	state.selectedEmployee = payload
}

export const setEmployeeLoansAndOutstanding = (state, payload) =>{
	state.loansAndOutstandings = payload
}

export const setEmployeePenaltiesAndDeductions = (state, payload) =>{
	state.penaltiesAndDeductions = payload
}
