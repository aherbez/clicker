import { ModalScreen } from './modal_screen';

export class StatsScreen extends ModalScreen {
    constructor(gr) {
        super();
        this.registry = gr;
    }

    renderStatsText(ctx) {
        const { playerStats } = this.registry;
        
        const statsStrings = playerStats.getStatsText()

        ctx.save();
        ctx.translate(0, 90);
        ctx.fillStyle = '#000';
        ctx.font = '20px helvetica';

        statsStrings.forEach(statText => {
            // ctx.save();
            // ctx.translate(10, 0);
            ctx.fillText(statText[0], 10, 0);
            ctx.fillText(statText[1], 250, 0);
            ctx.translate(0, 25);
        });

        ctx.restore();
    }


    render(ctx) {
        super.render(ctx);

        ctx.save();
        ctx.fillStyle = '#000';
        ctx.font = '50px helvetica';
        ctx.translate(10, 60);
        ctx.fillText('Stats', 0, 0);
        ctx.restore();

        this.renderStatsText(ctx);
    }



}