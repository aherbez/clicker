import { BusinessData, BusinessState } from '../business/business_data';

const STARTING_FUNDS = 100;

export class PlayerInventory {
    constructor(registry) {
        this.registry = registry;

        this.money = STARTING_FUNDS;
        this.businessStates = new Map();

        this.initBusinesses();
    }

    initBusinesses() {
        this.registry.businessLookup.forEach(businessData => {
            let businessState = new BusinessState();
            businessState.setFromBusinessData(businessData);
            this.businessStates.set(businessData.id, businessState);
        });
    }

    get currCash() {
        return this.money;
    }

    chargePlayer(cost) {
        if (cost < 0) return;
        this.money -= cost;
    }

    addFunds(funds) {
        if (funds < 0) return;
        this.money += funds;
    }

    canAfford(cost) {
        return (cost <= this.money);
    }

    costOfNextBusiness(bID) {
        if (this.businessStates.has(bID)) {
            return this.businessStates.get(bID).costOfNext;
        }
        return 0;
    }

    costOfNextBusinesses(bID, numToBuy) {
        // TODO: flesh this out for buying N at once
        return this.costOfNextBusiness(bID);
    }

    canAffordBusiness(bID) {
        return this.canAfford(this.costOfNextBusiness(bID));
    }

    maybePurchaseBusiness(bID) {
        const cost = this.costOfNextBusiness(bID);

        if (this.canAfford(cost)) {
            this.chargePlayer(cost);
            this.purchaseBusiness(bID);
        }
    }

    purchaseBusiness(bID, numToBuy = 1) {
        console.log(`BUYING ONE OF TYPE: ${bID}`);

        const businessData = this.registry.businessLookup.getBusinessDataById(bID);

        const bState = this.businessStates.get(bID);
        bState.addAndUpdateCost(numToBuy, businessData.baseCost, businessData.costMult);

        // this.debugPrintInv();
    }

    debugPrintInv() {
        this.businessStates.forEach(bState => {
            console.log(`type: ${bState.id} numOwned: ${bState.numOwned}`);
        })
    }

    // purchase managers and other upgrades
    purchaseUpgrade(uID) {
        // TODO: add this in
    }

    numOwned(bID) {
        if (this.businessStates.has(bID)) {
            return this.businessStates.get(bID).numOwned;
        }
        return 0;
    }

    getProgress(bID) {
        if (this.businessStates.has(bID)) {
            return this.businessStates.get(bID).fillAmount;
        }
        return 0;
    }

    canCollect(bID) {
        if (this.businessStates.has(bID)) {
            return this.businessStates.get(bID).fillAmount > 0.99;
        }
        return false;
    }

    maybeCollectFunds(bID) {
        if (this.canCollect(bID)) {
            const moneyCollected = this.businessStates.get(bID).maybeCollect();
            this.addFunds(moneyCollected);
        }
    }

    
    canStart(bID) {
        if (this.businessStates.has(bID)) {
            const bState = this.businessStates.get(bID);
            return ((bState.numOwned > 0) && (!bState.isTicking));
        }
        return false;
    }

    maybeStartBusiness(bID) {
        if (this.canStart(bID)) {
            const bState = this.businessStates.get(bID);
            bState.startProgress();
        }
    }

    // update state of each business
    tick() {
        const ts = Date.now();
        this.businessStates.forEach(bState => {
            const newFunds = bState.tickAndCollectFunds(ts);
            this.addFunds(newFunds);
        });

    }
}