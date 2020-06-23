import { Entity } from '../common/entity';
import { GameRegistry } from '../game_registry';
import { MoneyDisplay } from '../ui/money_display';
import { BusinessCatalog } from '../business/business_catalog';
import { Button } from '../ui/button';
import { ManagerScreen } from './manager_screen';

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

        /*
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
        */

        this.resetButton = new Button({
            label: 'reset',
            callback: () => {this.resetData();}
        });
        this.resetButton.setPos(10, 550);
        this.children.push(this.resetButton);

        this.showManagersButton = new Button({
            label: 'buy managers',
            callback: () => { this.showManagersPanel(); },
            width: 150,
            height: 40,
        });
        this.showManagersButton.setPos(600, 10);
        this.children.push(this.showManagersButton);

        this.managerPanel = new ManagerScreen(this.registry);
        this.managerPanel.closeCallback = () => {
            this.businessCatalog.enabled = true;
        }
        this.managerPanel.setPos(20, 20);
        this.children.push(this.managerPanel);
        this.managerPanel.visible = false;
    }

    saveData() {
        console.log(`saving data`);
        
        const { playerStorage } = this.registry;
        playerStorage.saveData();
    }

    loadData() {
        console.log(`loading data`);

        const { playerStorage } = this.registry;
        playerStorage.loadPlayerData();

    }

    resetData() {
        console.log(`resetting data`);

        const { playerInventory } = this.registry;
        playerInventory.resetData();
    }

    showManagersPanel() {
        this.managerPanel.visible = true;
        this.businessCatalog.enabled = false;
    }
}