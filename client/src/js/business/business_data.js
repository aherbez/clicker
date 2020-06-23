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
        this.moneyPerFill = data.funds || 1;
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
        this.autoStart = false;
        this.lastCollected = -1;    // timestamp
        this.fillAmount = 0;
        this.isTicking = false;
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
        let collected = 0;
        if (this.fillAmount > 0.99) {
            this.resetTimer();
            collected = (this.moneyPerFill * this.numOwned);
            console.log(`collected ${this.moneyPerFill} from ${this.numOwned} for a total of ${collected}`);
        }
        return collected;
    }

    collectFunds() {
        let collected = (this.moneyPerFill * this.numOwned);
        console.log(`collected ${this.moneyPerFill} from ${this.numOwned} for a total of ${collected}`);
        return collected;
    }

    startProgress() {
        this.resetTimer();
        this.isTicking = true;
    }

    tickAndCollectFunds(timestamp) {
        if (this.numOwned < 1) return 0;
        if (!this.isTicking) return 0;

        let timeSinceLast = timestamp - this.lastCollected;
        this.fillAmount = (timeSinceLast / this.timeToFill_MS)
        
        if (this.fillAmount > 0.99) {
            this.resetTimer();
            this.isTicking = this.autoStart;
            return this.collectFunds();
        }
        return 0;
    }
}