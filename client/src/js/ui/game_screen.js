import { Entity } from '../common/entity';
import { GameRegistry } from '../game_registry';
import { MoneyDisplay } from '../ui/money_display';
import { BusinessCatalog } from '../business/business_catalog';
import { Button } from '../ui/button';
import { ManagerScreen } from './manager_screen';
import { StatsScreen } from './stats_screen';

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

        this.showStatsButton = new Button({
            label: 'stats',
            callback: () => { this.showStatsPanel(); },
            width: 100,
            height: 40,
        });
        this.showStatsButton.setPos(490, 10);
        this.children.push(this.showStatsButton);

        this.managerPanel = new ManagerScreen(this.registry);
        this.managerPanel.closeCallback = () => {
            this.businessCatalog.enabled = true;
        }
        this.managerPanel.setPos(20, 20);
        this.children.push(this.managerPanel);
        this.managerPanel.visible = false;

        this.statsPanel = new StatsScreen(this.registry);
        this.statsPanel.closeCallback = () => {
            this.businessCatalog.enabled = true;
        }
        this.statsPanel.setPos(20, 20);
        this.children.push(this.statsPanel);
        this.statsPanel.hide();
    }

    saveData() {
        const { playerStorage } = this.registry;
        playerStorage.saveData();
    }

    loadData() {
        const { playerStorage } = this.registry;
        playerStorage.loadPlayerData();

    }

    resetData() {
        console.log(`resetting data`);

        const { playerInventory, playerStats, playerStorage } = this.registry;
        playerInventory.resetData();
        playerStats.resetData();

        playerStorage.saveData();
    }

    showManagersPanel() {
        this.managerPanel.show();
        this.businessCatalog.enabled = false;
    }

    showStatsPanel() { 
        this.statsPanel.show();
        this.businessCatalog.enabled = false;
    }
}