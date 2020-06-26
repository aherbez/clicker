import { Entity } from '../common/entity';
import { Button } from './button';
import { drawRoundedRect } from '../common/utils';
import { Colors } from '../ui/styles';

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
        this.closeBtn.setPos(710, 10);
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
        ctx.fillStyle = Colors.backColorOff; // '#b1b493';
        drawRoundedRect(ctx, 760, 560, 20);
        ctx.fill();
        ctx.stroke();
        ctx.restore();
    }
}