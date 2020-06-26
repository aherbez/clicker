import { Entity } from '../common/entity';
import { BuyButton } from './button_buy';
import { drawRoundedRect } from '../common/utils'; 

const WIDTH = 600;
const HEIGHT = 120;

export class UpgradeButton extends Entity {
    constructor(upData, gr) {
        super();
        this.registry = gr;
        this.upData = upData;
        this.requirementStr = '';
        
        this.canAfford = false;
        this.purchased = false;

        this.buyButton = new BuyButton({
            label: 'BUY',
            width: 100,
            height: 50,
            callback: () => { this.buyUpgrade(); }
        });
        this.buyButton.cost = this.upData.cost;
        this.buyButton.setPos(WIDTH - 110, HEIGHT - 60);
        this.children.push(this.buyButton);

        this.setRequirementString();
    }

    setRequirementString() {
        const { achievements } = this.registry;

        const achievementNames = [];
        this.upData.requirements.forEach(aID => {
            const ach = achievements.getAchievementById(`${aID}`);
            console.log(aID, ach);
            if (ach !== null) {
                achievementNames.push(ach.name);
            }
        });
        this.requirementStr = `Requires: ${achievementNames.join(', ')}`;
    }

    buyUpgrade() {
        const { playerInventory } = this.registry;

        console.log(`Buying upgrade: ${this.upData.name}`);

        playerInventory.maybePurchaseUpgrade(this.upData.id);
        // 
    }

    render(ctx) {
        ctx.save();
        ctx.fillStyle = '#aaf';
        ctx.strokeStyle = '#000';

        drawRoundedRect(ctx, WIDTH, HEIGHT, 10);
        ctx.fill();
        ctx.stroke();
        ctx.restore();

        ctx.save();
        ctx.font = '30px Helvetica';
        ctx.fillText(this.upData.name, 20, 30);
        ctx.restore();
    
        ctx.save();
        ctx.font = '20px Helvetica';
        ctx.fillText(this.upData.desc, 20, 55);
        ctx.restore();
        
        ctx.save();
        ctx.font = '20px Helvetica';
        ctx.fillText(this.requirementStr, 20, 75);
        ctx.restore();
    
    }
}