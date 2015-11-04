'use strict';

class Draw {
    constructor(context, images) {
        this.context = context;
        this.Images = images;
        this.initial = true;
    }

    zones() {
        if(this.initial) {
            console.log(this.Images.get('safezone'));
            this.initial = false;
        }
    }
}

export { Draw };