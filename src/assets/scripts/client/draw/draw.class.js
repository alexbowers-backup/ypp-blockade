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
        if (x in [0, 1, 2] || this.Config.get('columns') - 1 - x in [0, 1, 2]) {
            return 'safezone';
        } else {
            return 'opensea';
        }
    }
}

export { Draw };