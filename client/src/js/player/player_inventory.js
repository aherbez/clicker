import { BusinessData, BusinessState } from '../business/business_data';

const STARTING_FUNDS = 1;

export class PlayerInventory {
    constructor(registry) {
        this.registry = registry;

        this.money = STARTING_FUNDS;
        this.businessStates = new Map();
        this.ownedUpgrades = new Set();

        this.initBusinesses();
    }

    serialize() {
        let status = {};
        status.money = this.money;
        status.upgrades = Array.from(this.ownedUpgrades);
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

            if (data.upgrades) {
                data.upgrades.forEach(upID => {
                    this.ownedUpgrades.add(upID);
                })
            }
        }
        this.applyOfflineTicks();
    }

    resetData() {
        this.money = STARTING_FUNDS;
        this.ownedUpgrades = new Set();
        this.businessStates.forEach(bState => {
            bState.numOwned = 0;
            bState.lastStarted = -1;
            bState.autoStart = false;
            bState.updateCost();
        });
    }

    // apply funds generated while offline
    applyOfflineTicks() {
        const ts = Date.now();
        const { playerStats } = this.registry;
        let offlineTotal = 0;
        this.businessStates.forEach(bState => {
            // offlineTotal += bState.applyOfflineTicks(ts);
            let ticks = bState.applyOfflineTicks(ts);
            offlineTotal += bState.ticksToFunds(ticks);
            if (ticks > 1) {
                // ticks is the total number to apply credit for, including
                // the one last started with the client running, so only
                // add ticks that happened offline to the manager total
                playerStats.registerManagerStart(bState.id, (ticks-1));
            }
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

        const { playerStats, playerStorage } = this.registry;
        playerStats.registerMoneySpent(cost);
        playerStorage.maybeSaveData();
    }

    addFunds(funds) {
        if (funds < 0) return;
        this.money += funds;

        const { playerStats, playerStorage } = this.registry;
        playerStats.registerMoneyEarned(funds);
        playerStorage.maybeSaveData();
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

        const { playerStorage, playerStats } = this.registry;

        const businessData = this.registry.businessLookup.getBusinessDataById(bID);

        const bState = this.businessStates.get(bID);
        bState.addAndUpdateCost(numToBuy, businessData.baseCost, businessData.costMult);

        playerStats.registerBusinessBought(bID);
        playerStorage.saveData();
        // this.debugPrintInv();
    }

    debugPrintInv() {
        this.businessStates.forEach(bState => {
            console.log(`type: ${bState.id} numOwned: ${bState.numOwned}`);
        })
    }

    // purchase upgrades
    maybePurchaseUpgrade(uID) {
        // TODO: add this in
        const { upgrades, achievements } = this.registry;

        // don't buy it if we have it
        if (this.ownedUpgrades.has(uID)) {
            console.log('Already owned!');
            return;
        }
        const upgradeData = upgrades.getById(uID);
        if (upgradeData === null) {
            console.log('No Upgrade with that ID');
            return;
        }

        // don't buy it if we can't afford it
        if (true || this.canAfford(upgradeData.cost)) {
            // don't buy it if we haven't completed the requirements
            if (achievements.playerHasUnlockedAll(upgradeData.requirements)) {

                this.chargePlayer(upgradeData.cost);
                this.ownedUpgrades.add(upgradeData.id);
                this.recalcBonuses();
                console.log(`BOUGHT UPGRADE: ${upgradeData.name}`);

            } else {
                console.log('UNMET REQUIREMENTS');
            }
        } else {
            console.log(`Can't afford!`);
        }
    }

    recalcBonuses() {
        const { upgrades } = this.registry;
        
        // stack all the bonuses from owned upgrades
        const upgradeEffects = new Map();

        const ownedList = Array.from(this.ownedUpgrades);
        ownedList.forEach(upgradeID => {
            // stack any effects
        });

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

            const { playerStats, playerStorage } = this.registry;

            playerStats.registerManualStart(bID);
            playerStorage.maybeSaveData();
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
                const { playerStorage, playerStats } = this.registry;

                this.chargePlayer(cost);
                this.businessStates.get(bID).autoStart = true;
                this.businessStates.get(bID).startProgress();
                
                playerStats.registerManagerStart(bID, 1);
                playerStats.registerManagerBought(bID);
                playerStorage.saveData();
            }
        }
    }


    // update state of each business
    tick() {
        const { playerStorage, playerStats } = this.registry;

        const ts = Date.now();

        let totalGain = 0;

        this.businessStates.forEach(bState => {
            const newFunds = bState.tickAndCollectFunds(ts);

            if (bState.didRestart) {
                playerStats.registerManagerStart(bState.id, 1);
            }

            this.addFunds(newFunds);
            totalGain += newFunds;
        });

        // if we gained money, maybe save (rate-limit)
        if (totalGain > 0) {
            playerStorage.maybeSaveData();
        }

    }
}