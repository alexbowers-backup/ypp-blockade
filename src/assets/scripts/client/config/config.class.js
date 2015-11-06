'use strict';

class Config {
    constructor() {
        this.data = {
            rows: 15,
            columns: 30,
            grid_size: 30,
            cellWidth: 30,
            cellHeight: 30,
            height: null,
            width: null,
        };

        this.data.height = this.data.rows * this.data.cellHeight;
        this.data.width = this.data.columns * this.data.cellWidth;

        console.log(this.data);
    }

    get(name) {
        return this.data[name];
    }

    set(name, value) {
        this.data[name] = value;
    }
}

export { Config };