import { Entity } from '../common/entity';
import { ToastPanel } from './toast';

const TIME_TO_DISPLAY_SEC = 5;

export class ToastManager extends Entity {
    constructor(gr) {
        super();
        this.registry = gr;

        this.toasts = [];

        this.lastTime = Date.now();
    }

    showToast(msg) {
        console.log(`showing toast: ${msg}`);

        let t = new ToastPanel(msg);
        t.setPos(490, 540);

        this.toasts.push(t);
        this.children.push(t);
    }

    updateToasts() {
        let currTime = Date.now();

        this.toasts.forEach(toast => {
            if (currTime >= (toast.created + (TIME_TO_DISPLAY_SEC * 1000))) {
                toast.visible = false;
            }
        });

        this.children = this.children.filter(c => {
            return c.visible;
        });
    }

    render(ctx) {
        console.log(`rendering ${this.children.length} toasts`);

        this.updateToasts();
    }
}