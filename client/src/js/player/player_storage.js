
/**
 * Class responsible for persisting player data from session to session
 * Starting with a cookie-based approach for now
 */

const DATA_KEY_PREFIX = 'net.adrianherbez-clicker-';

// don't save more often than this, except when purchasing things
const RATE_LIMIT_MS = 2 * 1000;

export class PlayerStorage {
    constructor(gr) {
        this.registry = gr;
        this.lastSaved = -1;
    }

    loadPlayerData() {
        const { playerInventory, playerStats } = this.registry;

        // TODO: stats have to be loaded first, since loading the inventory
        // triggers catchup which in turn triggers stat saving (since money is added)
        // this isn't ideal and should be fixed, but later
        const statsData = this.getKey('stats');
        playerStats.deserialize(statsData);

        const inventoryData = this.getKey('inventory');
        playerInventory.deserialize(inventoryData);

        console.log(`PLAYER DATA LOADED`);
    }

    saveData() {
        console.log(`saving player data`);

        const { playerInventory, playerStats } = this.registry;
        
        const playerData = playerInventory.serialize();
        this.setKey('inventory', playerData);

        const statsData = playerStats.serialize();
        this.setKey('stats', statsData);

        this.lastSaved = Date.now();
    }

    maybeSaveData() {
        const timeSinceLast = Date.now() - this.lastSaved;
        if (this.lastSaved === -1 || (timeSinceLast >= RATE_LIMIT_MS)) {
            this.saveData();
        }
    }

    setKey(key, value) {
        // console.log(`SETTING KEY: ${key} to ${value}`);
        window.localStorage.setItem(
            `${DATA_KEY_PREFIX}${key}`,
            value
        );
    }

    getKey(key) {
        const value = window.localStorage.getItem(`${DATA_KEY_PREFIX}${key}`);

        // console.log(`GETTING KEY ${key} ${value}`);
        return value;
    }
}