import { Entity } from '../common/entity';
import { Button } from './button';
import { BuyButton } from './button_buy';
import { drawRoundedRect } from '../common/utils';

const WIDTH = 260;
const HEIGHT = 120;

export class ManagerPanel extends Entity {
    constructor(bd, gr) {
        super();
        this.registry = gr;
        this.businessData = bd;

        this.bounds = {
            x: WIDTH,
            y: HEIGHT
        }

        this.setupButtons();
    }

    setupButtons() {
        const { playerInventory } = this.registry;
        const managerCost = playerInventory.costForManager(this.businessData.id);

        this.buyButton = new BuyButton({
            label: 'BUY',
            width: 100,
            height: 50,
            callback: () => { this.buyManager(); }
        });
        this.buyButton.setPos(WIDTH/2 - 50, HEIGHT/2);
        this.children.push(this.buyButton);

        this.buyButton.cost = managerCost;
    }

    buyManager() {
        const { playerInventory } = this.registry;
        playerInventory.purchaseManager(this.businessData.id);
    }

    render(ctx) {
        const { playerInventory } = this.registry; 
        const playerHasManager = playerInventory.playerHasManager(this.businessData.id);
        const playerCanAffordManager = playerInventory.canAffordManager(this.businessData.id);

        this.buyButton.enabled = (playerCanAffordManager && !playerHasManager);


        ctx.save();
        ctx.fillStyle = '#ffcb74';
        drawRoundedRect(ctx, WIDTH, HEIGHT, 10);
        ctx.fill();
        ctx.restore();

        ctx.save();
        const titleStr = `${this.businessData.name}`;
        ctx.font = '30px helvetica';
        ctx.fillText(titleStr, 10, 40);
        ctx.restore();

        

    }

}