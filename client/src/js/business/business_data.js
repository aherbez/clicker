/**
 * BusinessData - holds info on a business type as retrieved from the server
 */
export class BusinessData {
    constructor(data) {
        this.id = data.id || -1;
        this.name = data.name || 'business';
        this.cost = data.cost || 1;
        this.costMult = data.costMult || 1;
        this.time = data.time || 10;
        this.icon = data.icon || 'null.png';
    }
}

/**
 * BusinessState - holds the current state of a given business type for the player
 */
export class BusinessState {
    constructor() {
        this.id = -1;
        this.numOwned = 0;
        this.timeToFill = 10;
        this.moneyPerFill = 10;
        this.autoCollect = false;
    }
}