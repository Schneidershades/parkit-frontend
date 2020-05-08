import localforage from 'localforage';

export const localForageService = localforage.createInstance({
  name: "mydatabase",
  version : 1.0,
  storeName : 'mystorageobj'
});

// THIS style of invocation is what worked for me... not the variant on the gh readme. see https://codepen.io/thgreasi/pen/ojYKeE?editors=1111
localForageService.setDriver([
  localforage.INDEXEDDB,
  ])
.then(() => {
  // use this to test your db connection - delete later
  // localForageService.setItem('testkey', 'testvalue', function() {
  //   console.log('Of the driver options given, localforage is using:' + localForageService.driver());
  // });
})
.catch(error => {
  // welp. you can't have nice things.
});

export default {
  localForageService
}