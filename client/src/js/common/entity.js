/**
 * Class for a game entity
 * (something that gets drawn to the screen, and can receive clicks)
 */

export class Entity {
    constructor() {
        this.pos = {
            x: 0,
            y: 0
        }
        this.bounds = {
            x: 0,
            y: 0
        }

        this.rotation = 0;
        this.children = [];

        this.show();
    }

    // no-op in base class
    onClick(pos) {}
    render(ctx) {}

    setPos(x, y) {
        this.pos.x = x;
        this.pos.y = y;
    }

    show() {
        this.visible = true;
        this.enabled = true;
    }

    hide() {
        this.visible = false;
        this.enabled = false;
    }

    // derives local click pos and passes event down to children
    handleClickInternal(pos) {
        if (!this.enabled || !this.visible) return;
        
        let localPos = {
            x: pos.x - this.pos.x,
            y: pos.y - this.pos.y
        }

        if ((localPos.x >= 0 && localPos.x < this.bounds.x) && 
            (localPos.y > 0 && localPos.y < this.bounds.y)) {
                this.onClick(localPos);
        }
        this.children.forEach(c => {
            c.handleClickInternal(localPos);
        })
    }

    // handles local position and passes rendering down to children
    _render(ctx) {
        if (!this.visible) return;

        ctx.save();
        ctx.translate(this.pos.x, this.pos.y);
        
        this.render(ctx);

        this.children.forEach(c => {
            c._render(ctx);
        });
        ctx.restore();
    }


}