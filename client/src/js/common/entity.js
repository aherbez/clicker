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
        this.rotation = 0;
        this.children = [];
    }

    // no-op in base class
    onClick(pos) {}
    render(ctx) {}

    // derives local click pos and passes event down to children
    _handleClick(pos) {
        let localPos = {
            x: pos.x - this.x,
            y: pos.y - this.y
        }
        this.onClick(localPos);

        this.children.forEach(c => {
            c._handleClick(localPos);
        })
    }

    // handles local position and passes rendering down to children
    _render(ctx) {
        ctx.save();
        ctx.translate(this.pos.x, this.pos.y);

        this.render(ctx);

        this.children.forEach(c => {
            c._render(ctx);
        });
        ctx.restore();
    }


}