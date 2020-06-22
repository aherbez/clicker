import { BusinessLookup } from './business/business_lookup';

/**
 * ClickerClient: main game class
 */

const TICK_TIME_MS = 500;

export class ClickerClient {

    constructor(stageId) {
        this.busList = new BusinessLookup();

        this.initTimers();
        this.initCanvas(stageId);

        this.update();
    }

    initCanvas(stageId) {
        this.canvasEl = document.getElementById(stageId);
        this.ctx = this.canvasEl.getContext('2d');

        this.bounds = {
            width: this.canvasEl.clientWidth,
            height: this.canvasEl.clientHeight,
        }
    }

    initTimers() {
        this.lastTime = Date.now();
        this.tickTimer = 0;

    }

    /**
     * function to handle ticking various update-able objects
     * (separate from rendering)
     */
    tick() {
        // update 
    }

    /**
     * render loop
     */
    render(dt) {
        let c = this.ctx;
        let { width, height } = this.bounds;        

        c.clearRect(0, 0, width, height);

        c.save();
        c.translate(width/2, height/2);
        c.fillRect(-10, -10, 20, 20);
        c.restore();
    }

    update() {
        let curr = Date.now();
        let deltaTime = curr - this.lastTime;
        this.lastTime = curr;

        // draw animation as often as possible
        this.render(deltaTime);

        // only tick if necessary
        this.tickTimer += deltaTime;
        if (this.tickTimer > TICK_TIME_MS) {
            this.tick();
            this.tickTimer = 0;
        }

        requestAnimationFrame(this.update.bind(this));
    }

}