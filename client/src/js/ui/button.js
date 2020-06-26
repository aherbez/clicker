import { Entity } from '../common/entity';
import { drawRoundedRect } from '../common/utils';

export const ButtonDefaultStyle = {
    radius: 10,
    fill: '#AFA',
    disabledColor: '#AAA',
    strokeColor: '#000',
    strokeColorDisabled: '#000',
    border: 3,    
}

export class Button extends Entity {
    constructor(params) {
        super();
        this.bounds.x = params.width || 50;
        this.bounds.y = params.height || 50;
        this.callback = params.callback || null;
        this.label = params.label || 'foo';

        this.radius = params.radius || ButtonDefaultStyle.radius;
        this.backColor = params.fill || ButtonDefaultStyle.fill;
        this.disabledColor = params.disabledColor || ButtonDefaultStyle.disabledColor;
        this.strokeColor = params.stroke || ButtonDefaultStyle.strokeColor;
        this.strokeColorDisabled = params.strokeDisabled || ButtonDefaultStyle.strokeColorDisabled;
        this.border = params.border || ButtonDefaultStyle.border;

        this.enabled = true;
    }

    onClick(pos) {
        if (!this.enabled || !this.visible) return;

        if (this.callback) {
            this.callback();
        }
    }

    drawButtonBack(ctx) {
        let r = this.radius;
        let w = this.bounds.x;
        let h = this.bounds.y;

        ctx.save();

        ctx.fillStyle = (this.enabled) ? this.backColor : this.disabledColor;
        ctx.strokeStyle = (this.enabled) ? this.strokeColor : this.strokeColorDisabled;
        ctx.lineWidth = this.border;

        drawRoundedRect(ctx, w, h, r);

        ctx.fill();
        ctx.stroke();

        ctx.restore();
    }

    render(ctx) {
        let w = this.bounds.x;
        let h = this.bounds.y;

        this.drawButtonBack(ctx);

        ctx.fillStyle = (this.enabled) ? this.strokeColor : this.strokeColorDisabled;

        ctx.save();
        ctx.textAlign = 'center';
        ctx.translate(w/2, h/2);
        ctx.font = '20px helvetica';
        ctx.fillText(this.label, 0, 0);
        ctx.restore();
    }
}