import { BusinessData } from './business_data';
import { Entity } from '../common/entity';
import { formatMoney } from '../common/utils';
import { Button } from '../ui/button';

const WIDTH = 380;
const HEIGHT = 150;

export class BusinessPanel extends Entity {
    constructor(bd, gr) {
        super();
        this.data = bd;
        this.registry = gr;

        this.bounds = {
            x: WIDTH,
            y: HEIGHT
        }

        this.setupButtons();
    }

    setupButtons() {
        this.buyButton = new Button({
            label: 'buy',
            width: 100,
            callback: () => {this.attemptPurchase();}
        });
        this.buyButton.setPos(120, 70);
        this.children.push(this.buyButton);
        
        this.startButton = new Button({
            label: 'start',
            width: 100,
            callback: () => {this.startBusiness();}
        });
        this.startButton.setPos(10,70);
        this.startButton.enabled = true;
        this.children.push(this.startButton);
    }

    onClick(pos) {
        // only buy on click if it's the first purchase
        // subsequent purchases require clicking on the "buy" button, specifically
        const owned = this.registry.playerInventory.numOwned(this.data.id);
        if (owned > 0) return;
        
        this.attemptPurchase();
    }

    attemptPurchase() {
        this.registry.playerInventory.maybePurchaseBusiness(this.data.id);
    }

    attemptCollect() {
        this.registry.playerInventory.maybeCollectFunds(this.data.id);
    }

    startBusiness() {
        this.registry.playerInventory.maybeStartBusiness(this.data.id);
    }

    _drawName(ctx) {
        ctx.save();

        ctx.textAlign = 'center';
        ctx.font = '40px helvetica';

        ctx.translate(WIDTH/2, HEIGHT/2);
        ctx.fillText(this.data.name, 0, 0);
        ctx.restore();
    }

    _drawFirstCost(ctx)  {
        const cost = this.registry.playerInventory.costOfNextBusiness(this.data.id);

        ctx.save();
        ctx.translate(WIDTH/2, HEIGHT/2 + 40);

        ctx.textAlign = 'center';
        ctx.font = '20px helvetica';
        ctx.fillText(formatMoney(cost), 0, 0);

        ctx.restore();
    }

    _renderPurchaseOption(ctx) {
        const canAfford = this.registry.playerInventory.canAffordBusiness(this.data.id);

        ctx.save();
        this._drawName(ctx);
        this._drawFirstCost(ctx);
        ctx.restore();
    }

    _renderStatus(ctx) {
        const { playerInventory } = this.registry;

        ctx.save();

        const owned = playerInventory.numOwned(this.data.id);

        // draw numOwned
        {
            let numOwnedStr = `${this.data.name}: ${owned}`;
            ctx.save();
            ctx.font = '20px helvetica';
            ctx.fillText(numOwnedStr, 10, 20);
            ctx.restore();
        }

        // render progress bar
        ctx.save();
        const fillAmount = playerInventory.getProgress(this.data.id);
        ctx.fillStyle = '#00AA00';

        ctx.fillRect(10, 30, (fillAmount * 100), 30);
        ctx.strokeRect(10, 30, 100, 30);

        ctx.restore();


        ctx.restore();
    }

    updateButtons() {
        const { playerInventory } = this.registry;

        const owned = playerInventory.numOwned(this.data.id);
        this.buyButton.visible = (owned > 0);
        // this.collectButton.visible = (owned > 0);    
        this.startButton.visible = (owned > 0);

        this.buyButton.enabled = playerInventory.canAffordBusiness(this.data.id);
        // this.collectButton.enabled = playerInventory.canCollect(this.data.id);
        this.startButton.enabled = playerInventory.canStart(this.data.id);
    }

    render(ctx) {
        this.updateButtons();

        ctx.beginPath();
        ctx.strokeRect(0, 0, WIDTH, HEIGHT);

        const owned = this.registry.playerInventory.numOwned(this.data.id);
        if (owned > 0) {
            this._renderStatus(ctx);
        } else {
            this._renderPurchaseOption(ctx);
        }
    }
}