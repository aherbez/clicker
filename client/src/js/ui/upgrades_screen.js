import { ModalScreen } from './modal_screen';
import { UpgradeButton } from './upgrade_button';

export class UpgradesScreen extends ModalScreen {
    constructor(gr) {
        super();
        this.registry = gr;

        this.upgradeButtons = [];
        this.initUpgradeButtons();
    }

    initUpgradeButtons() {
        const { upgrades, playerInventory, playerStats } = this.registry;

        upgrades.getAll().forEach((upData, index) => {
            let upgradeButton = new UpgradeButton(upData, this.registry);

            upgradeButton.setPos(20, (index * 130 + 70));

            this.upgradeButtons.push(upgradeButton);
            this.children.push(upgradeButton);
        });

    }

    render(ctx) {
        super.render(ctx);

        ctx.save();
        ctx.fillStyle = '#000';
        ctx.font = '50px helvetica';
        ctx.translate(10, 60);
        ctx.fillText('Buy Upgrades', 0, 0);
        ctx.restore();
    }
}