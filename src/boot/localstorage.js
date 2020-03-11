import store from 'app/src/store/index'
import { LocalStorage, SessionStorage } from 'quasar'

export const anyCartStorage = (commit, dispatch, rootState) => {
    if(LocalStorage.getItem('cart') != null){
    	return store.commit('shopping/setCart', JSON.parse(LocalStorage.getItem('cart')), { root: true })
    }
};

export default anyCartStorage;

