import { ModalScreen } from './modal_screen';
import { drawRoundedRect } from '../common/utils';

const WIDTH = 500;
const HEIGHT = 40;

export class AchievementPanel extends ModalScreen {
    constructor(gr) {
        super();
        this.registry = gr;
    }

    renderAchievement(ctx, aData, locked) {
        ctx.save();
        
        ctx.save();
        ctx.fillStyle = (locked) ? '#AAA' : '#4F4';
        ctx.strokeStyle = '#000';
        drawRoundedRect(ctx, WIDTH, HEIGHT, 5);
        ctx.fill();
        ctx.stroke();
        ctx.restore();

        ctx.save();
        ctx.fillStyle = '#000';
        ctx.font = '15px Helvetica';
        let msg = `${aData.name}: ${(locked ? 'LOCKED' : 'UNLOCKED')}`;
        ctx.fillText(msg, 20, 17);
        ctx.font = '12px Helvetica';
        ctx.fillText(aData.desc, 20, 27);
        ctx.restore()

        ctx.restore();

        ctx.translate(0, 45);
    }

    renderAchievements(ctx) {
        const { achievements } = this.registry; 
        
        console.log(achievements.getLockedAchievements());

        ctx.save();
        ctx.translate(20, 80);

        achievements.getUnlockedAchievements().forEach(aData => {
            this.renderAchievement(ctx, aData, false);
        });

        achievements.getLockedAchievements().forEach(aData => {
            this.renderAchievement(ctx, aData, true);
        });

        ctx.restore();
    }

    render(ctx) {
        super.render(ctx);

        ctx.save();
        ctx.fillStyle = '#000';
        ctx.font = '50px helvetica';
        ctx.translate(10, 60);
        ctx.fillText('Achievements', 0, 0);
        ctx.restore();
    
        this.renderAchievements(ctx);
    }
}