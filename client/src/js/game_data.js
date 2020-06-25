const SERVER_URL_DEV = 'http://localhost:8080';
const SERVER_URL = 'http://polar-earth-02456.herokuapp.com'

export class GameData {
    constructor() {
        this.businessJSON = null;
        this.achievementJSON = null;

        this.loaded = false;
    }

    getFromServer(callback) {
        fetch(`${SERVER_URL}/gamedata`).then(res => {
            res.json().then(resJSON => {
                console.log(resJSON);
                // l.initFromData(resJSON.data);

                this.businessJSON = resJSON.businesses;
                this.achievementJSON = resJSON.achievements;

                console.log(this.businessJSON);
                console.log(this.achievementJSON);

                this.loaded = true;
                callback();
            });
        });
    }
}