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
            return 'safezone';
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
        }

        return 'opensea';
    }
}

export { Draw };