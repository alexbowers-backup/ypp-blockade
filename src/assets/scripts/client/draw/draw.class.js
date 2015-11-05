'use strict';

class Draw {
    constructor(context, images, config) {
        this.context = context;
        this.Images = images;
        this.Config = config;
        this.initial = true;

    }

    zones() {
        if (this.initial) {
            for (var i = 0; i < this.Config.get('columns'); i++) {
                for (var j = 0; j < this.Config.get('rows'); j++) {
                    this.context.drawImage(this.Images.get(this.type(i, j)), this.Config.get('grid_size') * i, this.Config.get('grid_size') * j);
                }
            }
            this.initial = false;
        }
    }

    type(x, y) {
        /**
         * Make the left 3 most, and right 3 most columns be safezone
         */
        if ((x).in([0, 1, 2]) || (this.Config.get('columns') - x - 1).in([0, 1, 2])) {
            return 'safe-zone';
        } else if (
            (x == 4 && y == 11) ||
            (x == 11 && y == 9) ||
            (x == 19 && y == 9) ||
            (x == 17 && y == 4) ||
            (x == 22 && y == 13) ||
            (x == 23 && y == 2) ||
            (x == 9 && y == 3)
        ) {
            return 'rock';
        } else if (
            (x == 12 && y == 2) ||
            (x == 18 && y == 11)
        ) {
            return 'whirlwind-top-left';
        } else if (
            (x == 13 && y == 2) ||
            (x == 19 && y == 11)
        ) {
            return 'whirlwind-top-right';
        } else if (
            (x == 12 && y == 3) ||
            (x == 18 && y == 12)
        ) {
            return 'whirlwind-bottom-left';
        } else if (
            (x == 13 && y == 3) ||
            (x == 19 && y == 12)
        ) {
            return 'whirlwind-bottom-right';
        } else if (
            (x == 7 && y == 7) ||
            (x == 8 && y == 7) ||
            (x == 9 && y == 7) ||
            (x == 3 && y == 7) ||
            (x == 3 && y == 8) ||
            (x == 3 && y == 8) ||
            (x == 3 && y == 9) ||
            (x == 4 && y == 10) ||
            (x == 21 && y == 3)
        ) {
            return 'wind-left';
        } else if (
            (x == 7 && y == 8) ||
            (x == 8 && y == 8) ||
            (x == 9 && y == 8) ||
            (x == 10 && y == 8) ||
            (x == 3 && y == 10)
        ) {
            return 'wind-right';
        } else if (
            (x == 11 && y == 8) ||
            (x == 11 && y == 10) ||
            (x == 12 && y == 4)
        ) {
            return 'wind-up';
        } else if (
            (x == 19 && y == 8) ||
            (x == 21 && y == 10) ||
            (x == 19 && y == 4)
        ) {
            return 'wind-down';
        }

        return 'open-sea';
    }
}

export { Draw };