export const EffectTypes = {
    MONEY_MULT: 1,  // more revenue per event
    COST_MULT: 2,   // less cost per upgrade
    SPEED_MULT: 3   // less time per event
};

export class UpgradeData {
    constructor(data) {
        this.id = data.id || -1;
        this.name = data.name || '';
        this.desc = data.desc || '';
        this.requirements = data.requirements || [];
        this.effects = data.effects || [];
        this.cost = data.cost || 0;
    }

}

export class UpgradesList {
    constructor(gr) {
        this.registry = gr;

        this.upgradeLookup = new Map();

    }

    initFromData(upgradeJSON) {
        console.log(upgradeJSON);

        upgradeJSON.forEach(upData => {
            let upgrade = new UpgradeData(upData);
            this.upgradeLookup.set(upgrade.id, upgrade);
        });

        console.log(`Loaded ${this.upgradeLookup.size} upgrades`);
    }
    
    getAll() {
        return Array.from(this.upgradeLookup.values());
    }
}