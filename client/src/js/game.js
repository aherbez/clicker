const WIDTH = 600;
const HEIGHT = 800;

export class ClickerClient {

    constructor(elId) {
        this.canvasEl = document.getElementById(elId);
        this.ctx = this.canvasEl.getContext('2d');

        this.bounds = {
            width: this.canvasEl.clientWidth,
            height: this.canvasEl.clientHeight,
        }

        this.render();
    }

    render() {
        let c = this.ctx;
        let { width, height } = this.bounds;        

        c.clearRect(0, 0, width, height);


        c.save();
        c.translate(width/2, height/2);
        c.fillRect(-10, -10, 20, 20);
        c.restore();

        requestAnimationFrame(this.render.bind(this));
    }

}