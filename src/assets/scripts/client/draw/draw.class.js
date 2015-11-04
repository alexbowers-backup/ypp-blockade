'use strict';

class Draw {
    constructor(context, images) {
        this.context = context;
        this.Images = images;
        this.initial = true;
    }

    zones() {
        if(this.initial) {
            this.context.font = "30 px Arial";
            this.context.fillText("Hello World", 10, 50);
            for (var i = 0; i < 10; i++) {
                for (var j = 0; j < 10; j++) {
                    this.context.drawImage(this.Images.get('safezone'), 10, 20);
                }
            }
            this.initial = false;
        }
    }
}

export { Draw };