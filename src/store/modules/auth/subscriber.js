import store from 'app/src/store/index'
import axios from 'axios'
import { LocalStorage, SessionStorage } from 'quasar'

store.subscribe((mutation)=>{
	// console.log(mutation)
	switch (mutation.type){
		case 'auth/SET_TOKEN': 
		// console.log(mutation.payload)
		if (mutation.payload){
			// console.log(LocalStorage.getItem('token'))
			axios.defaults.headers.common['Authorization'] = `Bearer ${mutation.payload}`
			LocalStorage.set('token', mutation.payload)
		}else{
			axios.defaults.headers.common['Authorization'] = null
		}
		break;
	}
})

