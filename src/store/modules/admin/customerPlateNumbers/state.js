import localforage from 'localforage';
import { LocalStorage } from 'quasar'

export default{
	plateNumbers: localforage.getItem('plateNumbers') == undefined ? localforage.getItem('plateNumbers') : [],
	plateNumber: LocalStorage.getItem('plateNumber') != null  ? JSON.parse(LocalStorage.getItem('plateNumber')) : null,
	freeWash: null,
	useFreeWash: false,
}