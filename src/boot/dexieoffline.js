import Dexie from 'dexie';


export const createLocalDb = () => {
    const db = new Dexie('parkitdb');
    db.version(1).stores(
	    {
	    	cart: 'id,package,venue,services,amount,quantity,total',
	    }
    );
    db.open();

    return db;
};


export default createLocalDb;

