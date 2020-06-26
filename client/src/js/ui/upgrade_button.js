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
        
        this.requirementsMet = false;
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
        playerInventory.maybePurchaseUpgrade(this.upData.id);
    }

    updateState() {
        const { achievements, playerInventory } = this.registry;

        // if it's already been bought, don't check anything
        if (this.purchased) return;

        // check to see if the player owns it
        this.purchased = playerInventory.playerOwnsUpgrade(this.upData.id);

        // see if requirements have been met
        if (!this.requirementsMet) {
            this.requirementsMet = achievements.playerHasUnlockedAll(this.upData.requirements)
        }
        this.canAfford = playerInventory.canAfford(this.upData.cost);
    }

    render(ctx) {
        // TODO: this really shouldn't be checked each frame
        this.updateState();

        if (this.purchased || !this.requirementsMet) {
            this.buyButton.hide();
        } else {
            this.buyButton.show();

            if (this.canAfford) {
                this.buyButton.enabled = true;
            } else {
                this.buyButton.enabled = false;
            }
        }

        ctx.save();
        ctx.fillStyle = (this.requirementsMet) ? '#aaf' : '#aaa';
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