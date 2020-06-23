import { Entity } from '../common/entity';
import { GameRegistry } from '../game_registry';
import { MoneyDisplay } from '../ui/money_display';
import { BusinessCatalog } from '../business/business_catalog';
import { Button } from '../ui/button';

export class GameScreen extends Entity {
    constructor(gr) {
        super();
        this.registry = gr;

        this.init();
    }

    init() {
        this.businessCatalog = new BusinessCatalog(this.registry);
        this.businessCatalog.setPos(10, 60);
        this.children.push(this.businessCatalog);

        this.cashDisplay = new MoneyDisplay(this.registry);
        this.cashDisplay.setPos(10, 50);
        this.children.push(this.cashDisplay);

        this.saveDataButton = new Button({
            label: 'save',
            callback: () => {this.saveData();}
        });
        this.saveDataButton.setPos(300, 10);
        this.children.push(this.saveDataButton);

        this.loadDataButton = new Button({
            label: 'load',
            callback: () => {this.loadData();}
        });
        this.loadDataButton.setPos(360, 10);
        this.children.push(this.loadDataButton);

        this.resetButton = new Button({
            label: 'reset',
            callback: () => {this.resetData();}
        });
        this.resetButton.setPos(420, 10);
        this.children.push(this.resetButton);

    }

    saveData() {
        console.log(`saving data`);
        
        const { playerStorage } = this.registry;
        
        playerStorage.savePlayerData();
    }

    loadData() {
        console.log(`loading data`);

        const { playerStorage } = this.registry;

        playerStorage.loadPlayerData();

    }

    resetData() {
        console.log(`resetting data`);
    }
}