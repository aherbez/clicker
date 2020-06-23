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
        this.lastStarted = -1;    // timestamp
        this.fillAmount = 0;
        this.isTicking = false;

        this.moneyMultiplier = 1;
        this.timeMultiplier = 1;
    }

    setFromBusinessData(bd) {
        this.id = bd.id;
        this.timeToFill_MS = bd.time * 1000;
        this.moneyPerFill = bd.moneyPerFill;
        this.costOfNext = bd.baseCost;
        this.baseCost = bd.baseCost;
        this.costMult = bd.costMult;
    }

    addAndUpdateCost(numToBuy) {
        this.numOwned += numToBuy;
        this.updateCost();
    }

    updateCost() {
        this.costOfNext = this.baseCost * (Math.pow(this.costMult, this.numOwned));
    }

    resetTimer() {
        this.lastStarted = Date.now();
        this.fillAmount = 0;
        this.isTicking = this.autoStart;
    }

    maybeCollect() {
        let collected = 0;
        if (this.fillAmount > 0.99) {
            this.resetTimer();
            collected = (this.moneyPerFill * this.numOwned * this.moneyMultiplier);
            // console.log(`collected ${this.moneyPerFill} from ${this.numOwned} for a total of ${collected}`);
        }
        return collected;
    }

    collectFunds() {
        let collected = (this.moneyPerFill * this.numOwned * this.moneyMultiplier);
        return collected;
    }

    startProgress() {
        this.resetTimer();
        this.isTicking = true;
    }

    tickAndCollectFunds(timestamp) {
        if (this.numOwned < 1) return 0;
        if (!this.isTicking) return 0;

        let timeSinceLast = timestamp - this.lastStarted;
        this.fillAmount = (timeSinceLast / this.timeToFill_MS)
        
        if (this.fillAmount > 0.99) {
            this.resetTimer();
            return this.collectFunds();
        }
        return 0;
    }
}