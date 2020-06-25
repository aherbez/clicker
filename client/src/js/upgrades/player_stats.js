import { formatMoney } from '../common/utils';

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
    MANUAL_STARTS: 7,
    MANAGER_STARTS: 8,

    // keeping list-based stats IDs separate
    MANAGERS_BOUGHT_LIST: 100,
    UPGRADES_BOUGHT_LIST: 101,
    ACHIEVEMENTS_UNLOCKED: 102,
};

export class PlayerStats {
    constructor(gr) {
        this.registry = gr;

        this.stats = new Map();
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
        // console.log(`STATS TO SAVE: ${JSON.stringify(statsData)}`);
        return JSON.stringify(statsData);
    }

    deserialize(dataStr) {
        // console.log(`Setting stats from ${dataStr}`);
        const statData = JSON.parse(dataStr);

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

        // console.log('LOADED STATS', this.stats);
    }

    resetData() {
        this.stats = new Map();
    }

    getStatsText() {
        const statsText = [];

        statsText.push([
            'Total Money Earned', 
            formatMoney(this.maybeGetStat(Stats.MONEY_EARNED, 0))]);
        statsText.push([
            'Total Money Spent',
            formatMoney(this.maybeGetStat(Stats.MONEY_SPENT, 0))]);
        statsText.push(['Buinesses Bought', this.maybeGetStat(Stats.BUSINESS_BOUGHT_TOTAL, 0)]);
        statsText.push(['Manual Starts', this.maybeGetStat(Stats.MANUAL_STARTS, 0)]);
        statsText.push(['Managers Hired', this.maybeGetStat(Stats.MANAGERS_BOUGHT_NUM, 0)]);
        statsText.push(['Manager Starts', this.maybeGetStat(Stats.MANAGER_STARTS, 0)]);
        statsText.push(['Upgrades Purchased', this.maybeGetStat(Stats.UPGRADES_BOUGHT_NUM, 0)]);

        return statsText;
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

    registerManualStart(bID) {
        this._incrementStat(Stats.MANUAL_STARTS);
    }

    registerManagerStart(bID, num = 1) {
        this._incrementStat(Stats.MANAGER_STARTS, num);
    }

    registerBusinessBought(bID) {
        // just add one to the total businesses (number owned per business is already tracked
        // in player inventory, so let's not duplicate data)
        this._incrementStat(Stats.BUSINESS_BOUGHT_TOTAL);
    }

    // used to replace the current value of a stat
    _setStat(statID, value, checkAchievements = true) {
        // console.log(`setting stat: ${statID} to ${value}`);
        this.stats.set(statID, value);

        if (checkAchievements) {
            this.registry.achievements.checkAchievements();
        }
    }

    // used for stats that should be additive
    _incrementStat(statID, value = 1) {
        // console.log(`incrementing stat: ${statID} by ${value}`)

        if (this.stats.has(statID)) {
            const newValue = this.stats.get(statID) + value;
            this.stats.set(statID, newValue);
        } else {
            this._setStat(statID, value);
        }

        this.registry.achievements.checkAchievements();
    }

    // track the maximum reached
    _markMaxStat(statID, value) {
        let prevValue = -Infinity;
        if (this.stats.has(statID)) {
            prevValue = this.stats.get(statID);
        }
        let newValue = (value > prevValue) ? value : prevValue;
        this.stats.set(statID, newValue);

        this.registry.achievements.checkAchievements();
    }

    // track minimum reached (not using this yet, but adding for completeness)
    _markMinStat(statID, value) {
        let prevValue = Infinity;
        if (this.stats.has(statID)) {
            prevValue = this.stats.get(statID);
        }
        let newValue = (value < prevValue) ? value : prevValue;
        this.stats.set(statID, newValue);

        this.registry.achievements.checkAchievements();
    }

    // used to track things like upgrades bought and achievments unlocked
    _addToStatList(statID, value) {
        if (!this.stats.has(statID)) {
            this.stats.set(statID, new Set());
        }
        const list = this.stats.get(statID);
        list.add(value);

        this.registry.achievements.checkAchievements();
    }

    maybeGetStat(statID, defaultValue = null) {
        if (this.stats.has(statID)) {
            return this.stats.get(statID);
        }
        return defaultValue;
    }

}