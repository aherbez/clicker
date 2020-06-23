import { BusinessData, BusinessState } from '../business/business_data';

const STARTING_FUNDS = 1;

export class PlayerInventory {
    constructor(registry) {
        this.registry = registry;

        this.money = STARTING_FUNDS;
        this.businessStates = new Map();

        this.initBusinesses();
    }

    serialize() {
        let status = {};
        status.money = this.money;
        status.businesses = [];

        this.businessStates.forEach(businessState => {
            let state = {
                id: businessState.id,
                num: businessState.numOwned,
                lastStart: businessState.lastStarted,
                autoStart: businessState.autoStart
            };
            status.businesses.push(state);
        });
        return JSON.stringify(status);
    }

    deserialize(dataJSON) {
        const data = JSON.parse(dataJSON);
        console.log(data);

        if (data) {
            if (data.money) {
                this.money = data.money;
            }

            if (data.businesses) {
                data.businesses.forEach(storedBusinessData => {
                    const { id, num, lastStart, autoStart } = storedBusinessData;
                    
                    if (this.businessStates.has(id)) {
                        const bState = this.businessStates.get(id);
                        bState.numOwned = num;
                        bState.autoStart = autoStart;
                        bState.lastStarted = lastStart;
                        bState.updateCost();
                    }
                });
            }
        }
        this.applyOfflineTicks();
    }

    resetData() {
        this.money = STARTING_FUNDS;
        this.businessStates.forEach(bState => {
            bState.numOwned = 0;
            bState.lastStarted = -1;
            bState.autoStart = false;
            bState.updateCost();
        });
        this.registry.playerStorage.saveData();
    }

    // apply funds generated while offline
    applyOfflineTicks() {
        console.log('APPLYING OFFLINE TICKS');
        const ts = Date.now();

        let offlineTotal = 0;
        this.businessStates.forEach(bState => {
            offlineTotal += bState.applyOfflineTicks(ts);
        });

        this.addFunds(offlineTotal);
    }

    // create a new BusinessState for each business
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

        this.registry.playerStorage.saveData();
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

            this.registry.playerStorage.maybeSaveData();
        }
    }

    playerHasManager(bID) {
        if (this.businessStates.has(bID)) {
            return this.businessStates.get(bID).autoStart;
        }
        return false;
    }

    costForManager(bID) {
        const { businessLookup } = this.registry;
        const businessData = this.registry.businessLookup.getBusinessDataById(bID);

        if (businessData) {
            return businessData.managerCost;
        }
        return 0;
    }

    canAffordManager(bID) {
        const cost = this.costForManager(bID);
        return this.canAfford(cost);    
    }

    purchaseManager(bID) {
        const cost = this.costForManager(bID);
        if (this.canAfford(cost)) {
            
            if (this.businessStates.has(bID)) {
                this.chargePlayer(cost);
                this.businessStates.get(bID).autoStart = true;
                this.businessStates.get(bID).startProgress();
                this.registry.playerStorage.saveData();    
            }
        }
    }


    // update state of each business
    tick() {
        const ts = Date.now();

        let totalGain = 0;

        this.businessStates.forEach(bState => {
            const newFunds = bState.tickAndCollectFunds(ts);
            this.addFunds(newFunds);
            totalGain += newFunds;
        });

        // if we gained money, maybe save (rate-limit)
        if (totalGain > 0) {
            this.registry.playerStorage.maybeSaveData();
        }

    }
}