import { Entity } from '../common/entity';
import { Button } from './button';
import { drawRoundedRect } from '../common/utils';

export class ModalScreen extends Entity {
    constructor() {
        super();

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
    }

    onClose() {
        this.hide();

        if (this.closeCallback) {
            console.log(`on close CB`);
            this.closeCallback();
        }
    }

    render(ctx) {
        ctx.save();
        ctx.fillStyle = '#b1b493';
        drawRoundedRect(ctx, 700, 500, 20);
        ctx.fill();
        ctx.stroke();
        ctx.restore();
    }
}