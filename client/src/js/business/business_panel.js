import { BusinessData } from './business_data';
import { Entity } from '../common/entity';
import { formatMoney } from '../common/utils';

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
    }

    onClick(pos) {
        // only buy on click if it's the first purchase
        // subsequent purchases require clicking on the "buy" button, specifically
        const owned = this.registry.playerInventory.numOwned(this.data.id);
        if (owned < 1) {
            this.registry.playerInventory.maybePurchaseBusiness(this.data.id);
        }
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
        ctx.save();

        const owned = this.registry.playerInventory.numOwned(this.data.id);

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
        const fillAmount = this.registry.playerInventory.getProgress(this.data.id);
        ctx.fillStyle = '#00AA00';

        ctx.fillRect(10, 30, (fillAmount * 100), 30);
        ctx.strokeRect(10, 30, 100, 30);

        ctx.restore();


        ctx.restore();
    }

    render(ctx) {
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