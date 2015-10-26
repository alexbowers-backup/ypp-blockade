import { Game } from '../game/game.class.js';
import { Player } from '../player/player.class.js';

class Room {
    constructor() {
        this.users = [];
        this.master = null;
        this.Player = new Player;
        this.id = null;
        this.Game = new Game;
    }

    isCurrentUserMaster() {
        return this.Player.name === this.master;
    }

    leaveGame() {
        window.location.href = "/";
    }
}

export { Room };