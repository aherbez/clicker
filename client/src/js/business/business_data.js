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
        this.managerCost = data.managerCost || 100;
    }
}

/**
 * BusinessState - holds the current state of a given business type for the player
 */
export class BusinessState {
    constructor() {
        this.id = -1;
        this.numOwned = 0;
        this.timeToFill_MS = 10 * 1000;   // time to fill, in milliseconds
        this.moneyPerFill = 10;
        this.costOfNext = 10;
        this.autoStart = false;
        this.lastStarted = -1;    // timestamp
        this.fillAmount = 0;
        this.isTicking = false;

        this.didRestart = false;    // flag used for stat tracking

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
        // this.lastStarted = Date.now();
        this.fillAmount = 0;
        this.isTicking = this.autoStart;
        if (this.autoStart) {
            this.lastStarted = Date.now();
        } else {
            this.lastStarted = -1;
        }
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
        this.lastStarted = Date.now();
        this.isTicking = true;
    }

    tickAndCollectFunds(timestamp) {
        this.didRestart = false;
        if (this.numOwned < 1) return 0;
        if (!this.isTicking) return 0;

        let timeSinceLast = timestamp - this.lastStarted;
        this.fillAmount = (timeSinceLast / this.timeToFill_MS)
        
        if (this.fillAmount > 0.99) {
            this.resetTimer();
            this.didRestart = this.autoStart;
            return this.collectFunds();
        }
        return 0;
    }

    moneyPerTick() {
        return (this.moneyPerFill * this.numOwned * this.moneyMultiplier);
    }

    ticksToFunds(ticks) {
        return (ticks * this.moneyPerTick());
    }

    applyOfflineTicks(now) {
        if (this.lastStarted === -1) return 0;

        let timeSinceLastStartMS = (now - this.lastStarted);
        let timePerFill = (this.timeToFill_MS * this.timeMultiplier);
        let ticks = Math.floor(timeSinceLastStartMS / timePerFill);
            
        // credit the player with any fractional time
        let extraMS = timeSinceLastStartMS - (ticks * timePerFill);
        this.lastStarted = Date.now() - extraMS;
        this.fillAmount = (now - this.lastStarted) / this.timeToFill_MS;

        // console.log(`${this.id} ticks: ${ticks} extraMS ${extraMS}`);

        // make sure progress continues if it was previously started
        // or the player has purchased a manager
        if (this.autoStart || ticks < 1) {
            this.isTicking = true;
        }

        if (!this.autoStart) {
            // if the player doesn't have a manager, it can only have
            // completed a single time
            ticks = Math.min(ticks, 1);
        }

        // return (ticks * this.moneyPerFill * this.numOwned * this.moneyMultiplier);
        return ticks;
    }
}