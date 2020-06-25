import { BusinessData } from './business_data';


const SERVER_URL_DEV = 'http://localhost:8080';
const SERVER_URL = 'http://polar-earth-02456.herokuapp.com'

export class BusinessLookup {
    constructor(gr) {
        this.registry = gr;
        this.listings = new Map();
    }
    /*
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
    */

    initFromData(businessJSON) {
        // console.log(`Found data version: ${data.v}, initializing`);

        console.log(businessJSON);

        if (businessJSON) {
            businessJSON.forEach(business => {
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

    getBusinessDataById(id) {
        if (this.listings.has(id)) {
            return this.listings.get(id);
        }
        return null;
    }
}