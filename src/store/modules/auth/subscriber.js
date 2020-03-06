import store from 'app/src/store/index'
import axios from 'axios'

store.subscribe((mutation)=>{
	// console.log(mutation)
	switch (mutation.type){
		case 'auth/SET_TOKEN': 
		// console.log(mutation.payload)
		if (mutation.payload){
			// console.log(localStorage.getItem('token'))
			axios.defaults.headers.common['Authorization'] = `Bearer ${mutation.payload}`
			localStorage.setItem('token', mutation.payload)
		}else{
			axios.defaults.headers.common['Authorization'] = null
		}
		break;
	}
})

