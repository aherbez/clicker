import { BusinessData } from './business_data';


const SERVER_URL = 'http://localhost:3000';

export class BusinessLookup {
    constructor(loadedCallback = null) {
        // fetch list of businesses from server
        
        this.listings = new Map();

        this.onLoad = loadedCallback;

        let bl = this;
        fetch(`${SERVER_URL}/businesses/list`).then(res => {
            res.json().then(resJSON => {
                console.log(resJSON);
                bl.initFromData(resJSON.data);
            });
        });
    }

    initFromData(data) {
        console.log(`Found data version: ${data.v}, initializing`);

        console.log(data.businesses);

        if (data.businesses) {
            data.businesses.forEach(business => {
                let b = new BusinessData(business);
                this.listings.set(b.id, b);
                console.log(`loaded ${b.name}`);
            });
        }

        if (this.onLoad) {
            this.onLoad();
        }
    }

    forEach(f) {
        this.listings.forEach((bd) => {
            f(bd);
        });
    }

    getBusinessById(id) {
        if (this.listings.has(id)) {
            return this.listings.get(id);
        }
        return null;
    }
}