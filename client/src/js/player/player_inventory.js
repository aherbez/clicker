import { BusinessData, BusinessState } from '../business/business_data';

const STARTING_FUNDS = 0;

export class PlayerInventory {
    constructor(registry) {
        this.registry = registry;

        this.money = STARTING_FUNDS;
        this.businesses = new Map();
    }

    initBusinesses() {
        this.registry.businessLookup.forEach(business => {
            let businessState = new BusinessState();
        });
    }

    get currCash() {
        return this.money;
    }

    canAfford(cost) {
        return (cost <= this.money);
    }

    canAffordBusiness(bID) {
        return true;
    }

    purchaseBusiness(bID) {
        // if we have at least one, increment and update
        if (this.businesses.has(bID)) {

        } else {
            // otherwise add a new entry
        }
    }

    // purchase managers and other upgrades
    purchaseUpgrade(uID) {

    }

    numOwned(bID) {
        if (this.businesses.has(bID)) {
            return this.businesses.get(bID).numOwned;
        }
        return 0;
    }

    // update state of each business
    tick() {
        this.money += (1 + Math.random());
    }
}