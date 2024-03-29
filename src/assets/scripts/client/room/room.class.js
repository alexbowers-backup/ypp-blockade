import { Game } from '../game/game.class.js';
import { Player } from '../player/player.class.js';
import { Images } from '../images/images.class.js';
import { Config } from '../../shared/config/config.class.js';

class Room {
    constructor() {
        this.users = [];
        this.master = null;
        this.Player = new Player();
        this.id = null;
        this.Game = new Game(new Images(), new Config());
    }

    isCurrentUserMaster() {
        return this.Player.name === this.master;
    }

    leaveGame() {
        window.location.href = "/";
    }

    startGame() {
        this.Game.init();
    }
}

export { Room };