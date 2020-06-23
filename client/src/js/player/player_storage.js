
/**
 * Class responsible for persisting player data from session to session
 * Starting with a cookie-based approach for now
 */

const DATA_KEY_PREFIX = 'net.adrianherbez-clicker-';

// don't save more often than this, except when purchasing things
const RATE_LIMIT_SEC = 1;

export class PlayerStorage {
    constructor(gr) {
        this.registry = gr;
        this.lastSaved = -1;
    }

    loadPlayerData() {
        const { playerInventory } = this.registry;
        const data = this.getKey('inventory');
        playerInventory.deserialize(data);
    }

    saveData() {
        console.log(`saving player data`);

        const { playerInventory } = this.registry;
        
        const playerData = playerInventory.serialize();
        this.setKey('inventory', playerData);

        this.lastSaved = Date.now();
    }

    maybeSaveData() {
        const timeSinceLast = Date.now() - this.lastSaved;
        if (this.lastSaved === -1 || timeSinceLast >= RATE_LIMIT_SEC) {
            this.saveData();
        }
    }

    setKey(key, value) {
        window.localStorage.setItem(
            `${DATA_KEY_PREFIX}${key}`,
            value
        );
    }

    getKey(key) {
        const value = window.localStorage.getItem(`${DATA_KEY_PREFIX}${key}`);
        return value;
    }
}