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
        for (var i = 1; i < this.Config.get('columns'); i++) {
            this.context.beginPath();
            this.context.moveTo(i * this.Config.get('cellWidth'), 0);
            this.context.lineTo(i * this.Config.get('cellWidth'), this.Config.get('height'));
            this.context.strokeStyle = '#13415d';
            this.context.stroke();
        }

        for (var i = 1; i < this.Config.get('rows'); i++) {
            this.context.beginPath();
            this.context.moveTo(0, i * this.Config.get('cellHeight'));
            this.context.lineTo(this.Config.get('width'), i * this.Config.get('cellHeight'));
            this.context.strokeStyle = '#13415d';
            this.context.stroke();
        }
    }

    ships(users) {
        angular.forEach(users, (user) => {
            this.ship(user.vessel);
        });
    }

    ship(vessel) {
        this.context.save();
        this.context.drawImage(
            this.Images.get('ships'),
            0, 0,
            this.Config.get('cellWidth'), this.Config.get('cellWidth'),
            vessel.x * this.Config.get('cellWidth'), vessel.y * this.Config.get('cellHeight'),
            this.Config.get('cellWidth'), this.Config.get('cellHeight')
        );
        this.context.restore();
    }

    rocks(rocks) {
        angular.forEach(rocks, (rock) => {
            this.rock(rock);
        });
    }

    rock(rock) {
        this.context.drawImage(
            this.Images.get('rock'),
            rock.shift * this.Config.get('cellWidth'), 0,
            this.Config.get('cellWidth'), this.Config.get('cellHeight'),
            rock.column * this.Config.get('cellWidth'), rock.row * this.Config.get('cellHeight'),
            this.Config.get('cellWidth'), this.Config.get('cellHeight')
        );
    }
}

export { Draw };