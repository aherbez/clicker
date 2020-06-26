import { Button } from './button';
import { formatMoney } from '../common/utils';

export class BuyButton extends Button {
    constructor(params) {
        super(params);
    
        this.num = params.num || -1;
        this.cost = params.cost || 1;
    }

    render(ctx) {
        this.drawButtonBack(ctx);

        const buyStr = (this.num > 0) ? `Buy x${this.num}` : 'Buy';
        const costStr = formatMoney(this.cost);

        ctx.save();
        ctx.fillStyle = this.strokeColor;

        ctx.font = '20px Helvetica';
        ctx.textAlign = 'left';
        ctx.fillText(buyStr, 10, 20);

        ctx.fillText(costStr, 10, 40);

        ctx.restore();
    }
}