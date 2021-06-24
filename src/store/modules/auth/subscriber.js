import store from 'app/src/store/index'
import axios from 'axios'
import { LocalStorage } from 'quasar'
import { localForageService } from './localForageService'

export default async ({ app, router, store, Vue }) => {
  store.subscribe((mutation) => {
    switch (mutation.type) {
      case 'auth/SET_TOKEN':
        if (mutation.payload) {
          axios.defaults.headers.common.Authorization = `Bearer ${mutation.payload}`
          LocalStorage.set('token', mutation.payload)
        } else {
          axios.defaults.headers.common.Authorization = null
        }
        break
    }
  })
}
