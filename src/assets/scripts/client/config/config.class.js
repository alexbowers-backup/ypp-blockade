'use strict';

class Config {
    constructor() {
        this.data = {
            rows: 15,
            columns: 30,
            grid_size: 30,
        };
    }

    get(name) {
        return this.data[name];
    }

    set(name, value) {
        this.data[name] = value;
    }
}

export { Config };