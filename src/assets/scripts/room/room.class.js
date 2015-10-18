import { Game } from '../game/game.class.js';

class Room {
    constructor() {
        this.users = null;
        this.user = null;
        this.master = null;
        this.id = null;
        this.Game = new Game;
    }

    isMaster() {
        return this.master === this.user;
    }
}

export { Room };