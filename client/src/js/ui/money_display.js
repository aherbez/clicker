import { Entity } from '../common/entity';
import { formatMoney } from '../common/utils';

export class MoneyDisplay extends Entity {
    constructor(gr) {
        super();

        this.gameRegistry = gr; 
    }

    render(ctx) {
        ctx.font = '50px helvetica';
        let playerCashStr = formatMoney(this.gameRegistry.playerInventory.currCash);
        
        ctx.fillText(playerCashStr, 0, 0);

    }
}