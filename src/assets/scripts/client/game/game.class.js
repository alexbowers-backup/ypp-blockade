import { Draw } from '../draw/draw.class.js';

class Game {
    constructor() {
        this.started = false;
        this.Draw = new Draw;
    }

    init() {
        this.canvas_wrapper = document.getElementById('game-wrapper');
        this.canvas = document.getElementById('game');

        this.canvas.width = this.canvas_wrapper.clientWidth;
        this.canvas.height = this.canvas_wrapper.clientHeight;
        console.log('Called init on game');
        window.requestAnimationFrame(() => {
            this.loop()
        });
    }

    update() {
        this.Draw.zones();
    }

    loop() {
        window.requestAnimationFrame(() => {
            this.loop();
        });

        this.update();
    }
}

export { Game };