import { Draw } from '../draw/draw.class.js';

class Game {
    constructor(images) {
        this.started = false;
        this.Images = images;
        this.Images.set('safezone', 'safezone');
    }

    init() {
        this.canvas_wrapper = document.getElementById('game-wrapper');
        this.canvas = document.getElementById('game');

        this.canvas.width = this.canvas_wrapper.clientWidth;
        this.canvas.height = this.canvas_wrapper.clientHeight;

        this.Draw = new Draw(this.canvas.getContext('2d'), this.Images);

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