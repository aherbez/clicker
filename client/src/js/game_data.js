const SERVER_URL_DEV = 'http://localhost:8080';
const SERVER_URL = 'http://polar-earth-02456.herokuapp.com'

export class GameData {
    constructor() {
        this.businessJSON = null;
        this.achievementJSON = null;
        this.upgradesJSON = null;

        this.loaded = false;
    }

    getFromServer(callback) {
        fetch(`${SERVER_URL}/gamedata`).then(res => {
            res.json().then(resJSON => {
                this.businessJSON = resJSON.businesses;
                this.achievementJSON = resJSON.achievements;
                this.upgradesJSON = resJSON.upgrades;

                this.loaded = true;
                callback();
            });
        });
    }
}