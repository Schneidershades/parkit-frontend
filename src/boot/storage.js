import localforage from 'localforage';
import localforageGetItems from 'localforage-getitems'

export default async ({ app, router, store, Vue }) => {
  if(process.env.MODE != 'ssr'){

    const localForageService = localforage.createInstance({
      name: "mydatabase",
      version : 1.0,
      storeName : 'mystorageobj'
    });

    localForageService.setDriver([
      localforage.INDEXEDDB,
    ])
    .then(() => {
      console.log('good localstorage setup')
    })
    .catch(() => {
      console.log('bad localstorage setup')
    });
  }
}
