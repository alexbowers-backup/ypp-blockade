'use strict';

class Draw {
    constructor(context, images, config) {
        this.context = context;
        this.Images = images;
        this.Config = config;
        this.initial = true;

        console.log(this.Config);
    }

    zones() {
        if(this.initial) {
            for (var i = 0; i < this.Config.get('columns'); i++) {
                for (var j = 0; j < this.Config.get('rows'); j++) {
                    this.context.drawImage(this.Images.get(this.type(i, j)), this.Config.get('grid_size') * i, this.Config.get('grid_size') * j);
                }
            }
            this.initial = false;
        }
    }

    type(x, y) {
        console.log('X: ' + x + ' Y: ' + y);
        if(x == 0 || x == 1) {
            return 'safezone';
        } else {
            return 'opensea';
        }
    }
}

export { Draw };