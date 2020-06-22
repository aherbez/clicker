import { BusinessLookup } from './business/business_lookup';
import { BusinessCatalog } from './business/business_catalog';

/**
 * ClickerClient: main game class
 */

const TICK_TIME_MS = 500;

export class ClickerClient {

    constructor(stageId) {
        let businessCatalog = null;
        this.initTimers();
        this.initCanvas(stageId);

        this.busList = new BusinessLookup(this.initBusinessCatalog.bind(this));

        this.children = [];

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

    initBusinessCatalog() {
        this.businessCatalog = new BusinessCatalog(this.busList);
        this.children.push(this.businessCatalog);
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
        let ctx = this.ctx;
        let { width, height } = this.bounds;        

        ctx.clearRect(0, 0, width, height);
        ctx.save();

        if (this.businessCatalog) {
            this.businessCatalog._render(ctx);
        } else {
            ctx.save();
            ctx.translate(width/2, height/2);
            ctx.fillText('loading', 0, 0);

            ctx.restore();
        }

        ctx.restore();
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