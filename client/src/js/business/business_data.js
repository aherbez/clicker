/**
 * BusinessData - holds info on a business type as retrieved from the server
 */
export class BusinessData {
    constructor(data) {
        this.id = data.id || -1;
        this.name = data.name || 'business';
        this.baseCost = data.cost || 1;
        this.costMult = data.costMult || 1;
        this.time = data.time || 10;
        this.icon = data.icon || 'null.png';
        this.moneyPerFill = data.moneyPerFill || 1;

    }
}

/**
 * BusinessState - holds the current state of a given business type for the player
 */
export class BusinessState {
    constructor() {
        this.id = -1;
        this.numOwned = 0;
        this.timeToFill = 10;   // time to fill, in seconds
        this.moneyPerFill = 10;
        this.costOfNext = 10;
        this.autoCollect = false;
        this.lastCollected = -1;    // timestamp
        this.fillAmount = 0;
    }

    setFromBusinessData(bd) {
        this.id = bd.id;
        this.timeToFill_MS = bd.time * 1000;
        this.moneyPerFill = bd.moneyPerFill;
        this.costOfNext = bd.baseCost;
    }

    addAndUpdateCost(numToBuy, baseCost, costMult) {
        this.numOwned += numToBuy;
        this.costOfNext = baseCost * (Math.pow(costMult, this.numOwned));
    }

    resetTimer() {
        this.lastCollected = Date.now();
        this.fillAmount = 0;
    }

    maybeCollect() {
        let collected = false;
        if (this.fillAmount > 0.99) {
            this.resetTimer();
            collected = true;
        }
        return collected;
    }

    tick(timestamp) {
        if (this.numOwned < 1) return;
        
        let timeSinceLast = timestamp - this.lastCollected;
        this.fillAmount = (timeSinceLast / this.timeToFill_MS)
        
        let shouldAddFunds = false;
        if (this.fillAmount > 1) {
            if (this.autoCollect) {
                this.resetTimer();
                shouldAddFunds = true;
            } else {
                this.fillAmount = 1;
            }
        }
        return shouldAddFunds;
    }
}