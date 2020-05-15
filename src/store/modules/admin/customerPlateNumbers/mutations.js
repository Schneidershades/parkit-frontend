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
		userId: item ? item.userId : null, 
		freeWash: item ? item.freeWash : null, 
	}

	if (details.freeWash == true){
		state.freeWash = true
	}else{
		state.freeWash = false
	}

	
	state.plateNumber = details
}

export const updatePlateNumber = (state, plateNumber) =>{
	var plateNumberList = state.plateNumbers.data 

	if(plateNumber.phone){
		var item = plateNumberList.find(item => item.phone === plateNumber.phone);

		var details = {
			id: item ? item.id : null, 
			plateNumber: item ? item.plateNumber : plateNumber, 
			vehicleType: item ? item.vehicleType : null, 
			vehicleModel: item ? item.vehicleModel : null, 
			firstName: item ? item.firstName : null, 
			lastName: item ? item.lastName : null, 
			phone: item ? item.phone : null, 
			email: item ? item.email : null, 
			userId: item ? item.userId : null, 
			freeWash: item ? item.freeWash : null, 
		}
		
		if (details.freeWash == true){
			state.freeWash = true
		}else{
			state.freeWash = false
		}
	}
	state.plateNumber = plateNumber
}

export const clearPlateNumber = (state) =>{
	state.plateNumber = []
}

export const setFreeWashStatus = (state, status) =>{
	state.useFreeWash = status
}
