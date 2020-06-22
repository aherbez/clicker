const WIDTH = 600;
const HEIGHT = 800;

export class ClickerClient {

    constructor(elId) {
        this.canvasEl = document.getElementById(elId);
        this.ctx = this.canvasEl.getContext('2d');

        this.render();
    }

    render() {
        let c = this.ctx;

        c.clearRect(0, 0, WIDTH, HEIGHT);


        c.save();
        c.translate(WIDTH/2, HEIGHT/2);
        c.fillRect(-10, -10, 20, 20);
        c.restore();

        requestAnimationFrame(this.render.bind(this));
    }

}