import Dexie from 'dexie'

export const createLocalItem = (context, { dbName, tableName, data }) => {
      let flag = empty(data)
      var d = JSON.parse(data)
      const db = new Dexie(dbName)
      

      db.open().then(db => {
        const myTable = db.table(tableName);
          console.log('good')


          db.transaction("rw", tableName, tx => {
             db.tableName.bulkAdd(
              {id: 1, package: 1, venue: 1, services: 1, amount: 1, quantity: 1, total: 1}, 
              {id: 1, package: 1, venue: 1, services: 1, amount: 1, quantity: 1, total: 1}
            )
          }).then(result => {
              console.log('working')
          }).catch(error => {
              console.log(error)
          });


      }).catch(error => {
        console.error(error);
      })

      // db.transaction("rw", tableName, tx => {

      //    const objs = data
      //     for (const o of objs) {
      //       db.table.add(o);
      //     }

      // }).then(result => {
      //     console.log('working')
      // }).catch(error => {
      //     console.log(error)
      // });

      // db.transaction("rw", db.table, () => {

      //   const objs = data
      //   for (const o of objs) {
      //     db.table.add(o);
      //   }

      // }).catch(function (e) {
      //   console.log('not working')
      // });

      // console.log(d.length)
      // console.log(tableName, data)
      // if (flag) {
      //     tableName.bulkAdd(data)
      //     console.log("data inserted successfully...!")
      // } else {
      //     console.log("Please provide data...!")
      // }
      // return flag
}


const getLocalData = (dbname, fn) => {
    let index = 0
    let obj = {}
    dbname.count(count => {
        // count rows in the table using count method
        if (count) {
            dbname.each(table => {
            // table => return the table object data
            // to arrange order we are going to create for in loop
            obj = SortObj(table)
            fn(obj, index++) // call function with data argument
        })
        } else {
            fn(0)
        }
    })
}



// check textbox validation
const empty = object => {
    let flag = false
    for (const value in object) {
        if (object[value] != "" && object.hasOwnProperty(value)) {
            flag = true
        } else {
            flag = false
        }
    }
    return flag
}

const SortObj = (sortobj) => {
    let obj = {}
    obj = {
        id: sortobj.id,
        name: sortobj.name,
        seller: sortobj.seller,
        price: sortobj.price
    }
    return obj
}
