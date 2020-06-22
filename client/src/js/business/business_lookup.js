
const SERVER_URL = 'http://localhost:3000';

export class BusinessLookup {
    constructor() {
        // fetch list of businesses from server

        let bl = this;
        fetch(`${SERVER_URL}/businesses/list`).then(res => {
            res.json().then(data => {
                console.log(data);
                bl.initFromData(data);
            });
        });
    }

    initFromData(data) {
        console.log(`Found data version: ${data.v}, initializing`);
    }
}