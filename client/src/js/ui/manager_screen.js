import { Entity } from '../common/entity';
import { ModalScreen } from './modal_screen';
import { Button } from '../ui/button';
import { ManagerPanel } from './manager_panel';
import { drawRoundedRect } from '../common/utils';

export class ManagerScreen extends ModalScreen {
    constructor(gr) {
        super();
        this.registry = gr;

        /*
        this.closeCallback = null;
    
        this.closeBtn = new Button({
            label: 'X',
            callback: () => { this.onClose(); },
            width: 40,
            height: 40,
            fill: '#fcc',
            stroke: '#a00',
        });
        this.closeBtn.setPos(650, 10);
        this.children.push(this.closeBtn);
        */

        this.initManagerButtons();
    }

    /*
    onClose() {
        this.visible = false;
        if (this.closeCallback) {
            console.log(`on close CB`);
            this.closeCallback();
        }
    }
    */

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
        ctx.save();
        ctx.fillStyle = '#b1b493';

        drawRoundedRect(ctx, 700, 500, 20);

        ctx.fill();
        ctx.stroke();
        ctx.restore();

        ctx.save();
        ctx.fillStyle = '#000';
        ctx.font = '50px helvetica';
        ctx.translate(10, 60);
        ctx.fillText('Buy Managers', 0, 0);

        ctx.restore();
    }

}