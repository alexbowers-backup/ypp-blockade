import { Ship } from '../ship/ship.class.js';

class Player {
    constructor(object) {
        object = object || {};
        this.name = object.name || null;
        this.vessel = new Ship();
    }
}

export { Player }