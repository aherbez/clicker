import { BusinessData } from './business_data';

export class BusinessLookup {
    constructor(gr) {
        this.registry = gr;
        this.listings = new Map();
    }

    initFromData(businessJSON) {
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