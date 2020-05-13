export const setPlateNumbers = (state, plateNumbers) =>{
	state.plateNumbers = plateNumbers
}

export const setPlateNumber = (state, plateNumber) =>{
	var plateNumberList = state.plateNumbers.data 
	var item = plateNumberList.find(item => item.plateNumber === plateNumber);

	var details = {
		id: item ? item.id : null, 
		plateNumber: item ? item.plateNumber : plateNumber, 
		vehicleType: item ? item.vehicleType : null, 
		vehicleModel: item ? item.vehicleModel : null, 
		firstName: item ? item.firstName : null, 
		lastName: item ? item.lastName : null, 
		phone: item ? item.phone : null, 
		email: item ? item.email : null, 
	}

	if (item.freeWash == true){
		state.freeWash = true
	}else{
		state.freeWash = false
	}

	state.plateNumber = details
}

export const updatePlateNumber = (state, plateNumber) =>{
	state.plateNumber = plateNumber
}

export const clearPlateNumber = (state) =>{
	state.plateNumber = []
}
