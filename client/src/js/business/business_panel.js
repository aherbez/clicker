import { BusinessData } from './business_data';
import { Entity } from '../common/entity';
import { formatMoney, drawRoundedRect } from '../common/utils';
import { Button } from '../ui/button';
import { BuyButton } from '../ui/button_buy';
import { Colors } from '../ui/styles';

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

        this.canAfford = false;

        this.setupButtons();
    }

    setupButtons() {
        const currCost = this.registry.playerInventory.costOfNextBusiness(this.data.id);

        this.buyButton = new BuyButton({
            label: 'buy',
            width: 100,
            num: 1,
            cost: currCost,
            callback: () => {this.attemptPurchase();}
        });
        this.buyButton.setPos(120, 90);
        this.children.push(this.buyButton);

        this.startButton = new Button({
            label: 'start',
            width: 100,
            callback: () => {this.startBusiness();}
        });
        this.startButton.setPos(10, 90);
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

        const currCost = this.registry.playerInventory.costOfNextBusiness(this.data.id);
        this.buyButton.cost = currCost;
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
        // const canAfford = this.registry.playerInventory.canAffordBusiness(this.data.id);

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
        let numOwnedStr = `${this.data.name}: ${owned}`;
        ctx.save();
        ctx.font = '20px helvetica';
        ctx.fillText(numOwnedStr, 20, 30);
        ctx.restore();

        // render progress bar
        ctx.save();
        const fillAmount = playerInventory.getProgress(this.data.id);
        ctx.fillStyle = '#00AA00';
        ctx.translate(20, 40);
        const fillWidth = (fillAmount * 200);
        
        let radius = Math.min(fillWidth/2, 5);
        if (fillWidth > 10) {
            drawRoundedRect(ctx, fillWidth, 40, radius);
            ctx.fill();    
        } else {
            ctx.fillRect(0, 0, fillWidth, 40);
        }
        
        ctx.restore();

        // draw money per tick
        ctx.save();

        ctx.restore();
        
        ctx.save();
        ctx.translate(20, 40);
        drawRoundedRect(ctx, 200, 40, 5);
        ctx.stroke();
        ctx.restore();

        ctx.restore();
    }

    updateButtons() {
        const { playerInventory } = this.registry;

        this.canAfford = playerInventory.canAffordBusiness(this.data.id);

        const owned = playerInventory.numOwned(this.data.id);
        const nextCost = playerInventory.costOfNextBusiness(this.data.id);

        this.buyButton.visible = (owned > 0);    
        this.startButton.visible = (owned > 0);

        this.buyButton.enabled = this.canAfford;
        this.startButton.enabled = playerInventory.canStart(this.data.id);

        this.buyButton.cost = nextCost;
    }

    render(ctx) {
        this.updateButtons();

        const owned = this.registry.playerInventory.numOwned(this.data.id);

        ctx.save();

        ctx.fillStyle = (owned > 0) ? Colors.backColorOff : Colors.backColorOn;
        ctx.strokeStyle = Colors.borderColorMain;
        ctx.lineWidth = 5;

        drawRoundedRect(ctx, WIDTH, HEIGHT, 20);

        ctx.stroke();

        if (this.canAfford || owned > 0) ctx.fill();
        ctx.restore();

        
        if (owned > 0) {
            this._renderStatus(ctx);
        } else {
            this._renderPurchaseOption(ctx);
        }
    }
}