// import whatever u need from your 'statemapper'... this is just an example.
import { setPersistedState, getPersistedState } from './statemapper'; 
import store from 'app/src/store/index'
import axios from 'axios'
import { LocalStorage } from 'quasar'
import { localForageService } from './localForageService'
import localforage from 'localforage'

//decide which mutations you want to listen in on, for persisting app data

const testOffline = async () => {
  axios.defaults.baseURL = 'http://localhost:8000/'

  // console.log(await localForageService.getItem('orders'))

  // if(await localForageService.getItem('cart') == null){
  //   localForageService.setItem('cart', [])
  //   console.log('cart created')
  // }
  // if(await localForageService.getItem('plateNumber') == null){
  //   localForageService.setItem('plateNumber', [])
  //   console.log('plateNumber created')
  // }
  // if(await localForageService.getItem('orders') == null){
  //   localForageService.setItem('orders', [])
  //   console.log('orders created')
  // }

}
// async function returns a promise
testOffline()
  .then(() => {
    console.log('fetched online data')
})




const mutationsOfInterest = [
  'customerPlateNumbers/setPlateNumbers',
  'auth/SET_USER',
  // 'adminShopping/setCart',
  // 'adminOrders/setOrder',
];

const ofInterest = (mutation) => {
  return mutationsOfInterest.includes(mutation);
};


store.subscribe((mutation, state) => {
  if (ofInterest(mutation.type)) {
    console.log('type', mutation.type)
    // handover to relevant get/set mappings. straightfwd example would be:
    setPersistedState(state); 
  }else{
    // console.log('lond')
  }
});

