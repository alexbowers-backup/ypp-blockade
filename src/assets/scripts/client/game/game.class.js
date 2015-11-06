import { Draw } from '../draw/draw.class.js';

class Game {
    constructor(images, config) {
        this.started = false;
        this.Images = images;
        this.Config = config;
        this.Images.set('safe-zone', 'safezone');
        this.Images.set('open-sea', 'opensea');
        this.Images.set('rock', 'rock');
        this.Images.set('whirlwind-top-left', 'whirlwind-top-left');
        this.Images.set('whirlwind-top-right', 'whirlwind-top-right');
        this.Images.set('whirlwind-bottom-left', 'whirlwind-bottom-left');
        this.Images.set('whirlwind-bottom-right', 'whirlwind-bottom-right');
        this.Images.set('wind-left', 'wind-left');
        this.Images.set('wind-right', 'wind-right');
        this.Images.set('wind-up', 'wind-up');
        this.Images.set('wind-down', 'wind-down');

    }

    init() {
        this.canvas_wrapper = document.getElementById('game-wrapper');
        this.canvas = document.getElementById('game');

        this.canvas.width = 1920;
        this.canvas.height = 1600;

        this.Draw = new Draw(this.canvas.getContext('2d'), this.Images, this.Config);

        window.requestAnimationFrame(() => {
            this.loop()
        });
    }

    update() {
        this.Draw.zones();
        this.Draw.outline();
    }

    loop() {
        window.requestAnimationFrame(() => {
            this.loop();
        });

        this.update();
    }
}

export { Game };