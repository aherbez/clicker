/**
 * Responsible for tracking player stats
 * 
 * Exposes a variety of specific functions that are syntactic sugar wrappers around
 * one or more of the base stat-altering functions.
 */

export const Stats = {
    MONEY_EARNED: 1,
    MONEY_SPENT: 2,
    BUSINESS_OWNED: 3,
    MANAGERS_BOUGHT_NUM: 4,
    UPGRADES_BOUGHT_NUM: 5,
    BUSINESS_BOUGHT_TOTAL: 6,

    // keeping list-based stats IDs separate
    MANAGERS_BOUGHT_LIST: 100,
    UPGRADES_BOUGHT_LIST: 101,
    ACHIEVEMENTS_UNLOCKED: 102,
};

export class PlayerStats {
    constructor(gr) {
        this.registry = gr;

        this.stats = new Map();

        this._setStat(Stats.MONEY_EARNED, 100);
        this._addToStatList(Stats.UPGRADES_BOUGHT_LIST, 3);
        this._addToStatList(Stats.UPGRADES_BOUGHT_LIST, 23);
        this._addToStatList(Stats.UPGRADES_BOUGHT_LIST, 3);

    }

    // serialize stats for saving data
    serialize() {
        const statsData = [];

        // write out simple values directly
        this.stats.forEach((statValue, statID) => {
            // handle the Set-based stats
            if (typeof statValue === 'object') {
                statsData.push([
                    1,
                    statID,
                    Array.from(statValue)
                ]);
            } else {
                // simple stats
                statsData.push([
                    0, // flag to identify listings
                    statID,
                    statValue
                ]);
            }
        });
        return JSON.stringify(statsData);
    }

    deserialize(dataStr) {
        console.log(`Setting stats from ${dataStr}`);
        const statData = JSON.parse(dataStr);
        console.log(statData);

        statData.forEach(statEntry => {
            let isSet = (statEntry[0] === 1);
            let statID = statEntry[1];
            let valueOrValues = statEntry[2];

            if (isSet) {
                const s = new Set();
                valueOrValues.forEach(v => {
                    s.add(v);
                })
                this.stats.set(statID, s);
            } else {
                this.stats.set(statID, valueOrValues);
            }
        });

        console.log('LOADED STATS', this.stats);
    }

    registerMoneySpent(num) {
        if (num < 0) return;
        this._incrementStat(Stats.MONEY_SPENT, num);
    }

    registerMoneyEarned(num) {
        this._incrementStat(Stats.MONEY_EARNED, num);
    }

    registerManagerBought(bID) {
        this._incrementStat(Stats.MANAGERS_BOUGHT_NUM);
        this._addToStatList(Stats.MANAGERS_BOUGHT_LIST, bID);
    }

    registerUpgradeBought(upgradeID) {
        this._incrementStat(Stats.UPGRADES_BOUGHT_NUM);
        this._addToStatList(Stats.UPGRADES_BOUGHT_LIST, upgradeID);
    }

    registerBusinessBought(bID) {
        // just add one to the total businesses (number owned per business is already tracked
        // in player inventory, so let's not duplicate data)
        this._incrementStat(Stats.BUSINESS_BOUGHT_TOTAL);
    }

    // used to replace the current value of a stat
    _setStat(statID, value) {
        this.stats.set(statID, value);        
    }

    // used for stats that should be additive
    _incrementStat(statID, value = 1) {
        if (this.stats.has(statID)) {
            const newValue = this.stats.get(statID) + value;
            this.stats.set(statID, newValue);
        } else {
            this._setStat(statID, value);
        }
    }

    // track the maximum reached
    _markMaxStat(statID, value) {
        let prevValue = -Infinity;
        if (this.stats.has(statID)) {
            prevValue = this.stats.get(statID);
        }
        let newValue = (value > prevValue) ? value : prevValue;
        this.stats.set(statID, newValue);
    }

    // track minimum reached (not using this yet, but adding for completeness)
    _markMinStat(statID, value) {
        let prevValue = Infinity;
        if (this.stats.has(statID)) {
            prevValue = this.stats.get(statID);
        }
        let newValue = (value < prevValue) ? value : prevValue;
        this.stats.set(statID, newValue);        
    }

    // used to track things like upgrades bought and achievments unlocked
    _addToStatList(statID, value) {
        if (!this.stats.has(statID)) {
            this.stats.set(statID, new Set());
        }
        const list = this.stats.get(statID);
        list.add(value);
    }

    // trigger a check of achivements
    _checkAcheivements() {

    }

}