import { Entity } from '../common/entity';
import { drawRoundedRect } from '../common/utils';
import { Colors } from '../ui/styles';

const WIDTH = 300;
const HEIGHT = 50;

const BACK_COLOR = '#AAA';
const EDGE_COLOR = '#000';

export class ToastPanel extends Entity {
    constructor(msg) {
        super();
        this.message = msg;

        this.created = Date.now();
    }

    render(ctx) {
        ctx.save();

        drawRoundedRect(ctx, WIDTH, HEIGHT, 10);

        ctx.fillStyle = Colors.backgroundBlue;
        ctx.strokestyle = EDGE_COLOR;

        ctx.fill();
        ctx.stroke();

        ctx.restore();

        ctx.save();
        ctx.fillStyle = '#000';
        ctx.font = '20px Helvetica';
        ctx.fillText(this.message, 10, HEIGHT/2);

        ctx.restore();

    }
}