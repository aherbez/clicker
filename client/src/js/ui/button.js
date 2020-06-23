import { Entity } from '../common/entity';

export class Button extends Entity {
    constructor(params) {
        super();
        this.bounds.x = params.width || 50;
        this.bounds.y = params.height || 50;
        this.callback = params.callback || null;
        this.label = params.label || 'foo';
        this.radius = params.radius || 5;
        this.backColor = params.fill || '#AFA';
        this.disabledColor = params.disabledColor || '#AAA';
        this.strokeColor = params.stroke || '#000';

        this.enabled = true;
    }

    onClick(pos) {
        if (!this.enabled || !this.visible) return;

        if (this.callback) {
            console.log(`clicked on button`);
            this.callback();
        }
    }

    drawButtonBack(ctx) {
        let r = this.radius;
        let w = this.bounds.x;
        let h = this.bounds.y;

        ctx.fillStyle = (this.enabled) ? this.backColor : this.disabledColor;
        ctx.strokeStyle = this.strokeColor;

        ctx.beginPath();
        
        ctx.moveTo(r, 0);
        ctx.lineTo(w-r, 0);
        ctx.lineTo(w, r);
        ctx.lineTo(w, h-r);
        ctx.lineTo(w-r,h);
        ctx.lineTo(r,h);
        ctx.lineTo(0, h-r);
        ctx.lineTo(0,r);
        ctx.lineTo(r,0);

        ctx.fill();
        ctx.stroke();
    }

    render(ctx) {
        let w = this.bounds.x;
        let h = this.bounds.y;

        this.drawButtonBack(ctx);

        ctx.fillStyle = this.strokeColor;

        ctx.save();
        ctx.textAlign = 'center';
        ctx.translate(w/2, h/2);
        ctx.font = '20px helvetica';
        ctx.fillText(this.label, 0, 0);
        ctx.restore();
    }
}