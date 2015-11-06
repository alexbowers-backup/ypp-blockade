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
        }

        return 'open-sea';
    }

    outline() {
        for(var i = 1; i < this.Config.get('columns'); i++) {
            this.context.beginPath();
            this.context.moveTo(i * this.Config.get('cellWidth'), 0);
            this.context.lineTo(i * this.Config.get('cellWidth'), this.Config.get('height'));
            this.context.strokeStyle = '#13415d';
            this.context.stroke();
        }

        for(var i = 1; i < this.Config.get('rows'); i++) {
            this.context.beginPath();
            this.context.moveTo(0, i * this.Config.get('cellHeight'));
            this.context.lineTo(this.Config.get('width'), i * this.Config.get('cellHeight'));
            this.context.strokeStyle = '#13415d';
            this.context.stroke();
        }
    }

    ships(users) {
        console.log(users);
        angular.forEach(users, (user) => {
            this.ship(user.vessel);
        });
    }

    ship(vessel) {
        this.context.save();
        this.context.translate(vessel.x, vessel.y);
        this.context.drawImage(this.Images.get('ships'), 0, 0, 30, 30, 0, 0, 30, 30);
        this.context.restore();
    }
}

export { Draw };