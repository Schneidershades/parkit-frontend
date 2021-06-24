import { localForageService } from './localForageService';

export const setPersistedState = (state) => {
  const persistedState = mapToPersistedState(state)

  const promises = [];
  return new Promise((resolve, reject) => {
    for (let elem in state) {
      var deep = state[elem]
      for (let s in deep ) {
        if(s == 'cart'|| s == 'connected'|| s == 'history'|| s == 'roles'|| s == 'token'|| s == 'user' || s == 'plate_numbers'|| s == 'products')
        promises.push(localForageService.setItem(s, deep[s]));
      }
    }

    Promise.all(promises)
    .then(result => {
      resolve(result);
    })
    .catch(() => {
      console.log('not created')
    })
  });
};

export const getPersistedState = (fetchKey) => {
  // u decide how to fetch from cache
  if(fetchKey) {
    return localForageService.getItem(fetchKey);
  } else {
    // get everything!!
    return localForageService.getItems().then(resultObj => {
      // console.log(resultObj)
      setPersistedState(resultObj)
      // return Promise.resolve(Object.values(resultObj));
    });
  }
}

export const deletePersistedState = () => {
  // u decide how to delete cache
}

export const mapToPersistedState = (state) => {
  // whatever your business logic is.
  // console.log(state)
};