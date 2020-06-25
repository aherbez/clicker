import { ModalScreen } from './modal_screen';

export class AchievementPanel extends ModalScreen {
    constructor(gr) {
        super();
        this.registry = gr;
    }

    render(ctx) {
        super.render(ctx);

        ctx.save();
        ctx.fillStyle = '#000';
        ctx.font = '50px helvetica';
        ctx.translate(10, 60);
        ctx.fillText('Achievements', 0, 0);
        ctx.restore();
    }
}