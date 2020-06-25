import { Entity } from '../common/entity';
import { ModalScreen } from './modal_screen';
import { Button } from '../ui/button';
import { ManagerPanel } from './manager_panel';

export class ManagerScreen extends ModalScreen {
    constructor(gr) {
        super();
        this.registry = gr;

        this.initManagerButtons();
    }

    initManagerButtons() {
        const { businessLookup } = this.registry;
        let i=0;
        businessLookup.forEach(bData => {
            let mp = new ManagerPanel(bData, this.registry);
            mp.setPos(20, 130*i+80);
            this.children.push(mp);
            i++;
        });

    }

    render(ctx) {
        super.render(ctx);

        ctx.save();
        ctx.fillStyle = '#000';
        ctx.font = '50px helvetica';
        ctx.translate(10, 60);
        ctx.fillText('Buy Managers', 0, 0);
        ctx.restore();
    }

}