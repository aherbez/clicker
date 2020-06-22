import { BusinessData } from './business_data';
import { Entity } from '../common/entity';
import { formatMoney } from '../common/utils';

const WIDTH = 380;
const HEIGHT = 150;

export class BusinessPanel extends Entity {
    constructor(bd, gr) {
        super();
        this.data = bd;
        this.gameRegistry = gr;

        this.bounds = {
            x: WIDTH,
            y: HEIGHT
        }
    }

    onClick(pos) {
        console.log(`CLICKED ON ${this.data.name} ${JSON.stringify(pos)}`);
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
        ctx.save();
        ctx.translate(WIDTH/2, HEIGHT/2 + 40);

        ctx.textAlign = 'center';
        ctx.font = '20px helvetica';
        ctx.fillText(formatMoney(this.data.cost), 0, 0);

        ctx.restore();
    }

    _renderPurchaseOption(ctx) {
        ctx.save();
        this._drawName(ctx);
        this._drawFirstCost(ctx);
        ctx.restore();
    }

    _renderStatus(ctx) {
        ctx.save();

        ctx.restore();
    }

    render(ctx) {
        ctx.beginPath();
        ctx.strokeRect(0, 0, WIDTH, HEIGHT);


        let ownedNum = 0;
        if (ownedNum >= 1) {
            this._renderStatus(ctx);
        } else {
            this._renderPurchaseOption(ctx);
        }
    }
}