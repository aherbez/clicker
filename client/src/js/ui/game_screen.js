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

        this.resetButton = new Button({
            label: 'reset',
            callback: () => {this.resetData();}
        });
        this.resetButton.setPos(300, 500);
        this.children.push(this.resetButton);
    }

    resetData() {
        console.log(`resetting data`);
    }
}