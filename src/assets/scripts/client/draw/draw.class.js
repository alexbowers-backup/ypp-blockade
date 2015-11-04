'use strict';

class Draw {
    constructor(context, images) {
        this.context = context;
        this.Images = images;
        this.initial = true;
    }

    zones() {
        if(this.initial) {
            for (var i = 0; i < 30; i++) {
                for (var j = 0; j < 25; j++) {
                    this.context.drawImage(this.Images.get('safezone'), 30 * i, 30 * j);
                }
            }
            this.initial = false;
        }
    }
}

export { Draw };