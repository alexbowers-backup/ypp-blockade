'use strict';
import { User } from '../user/user.class.js';
import { Form } from '../form/form.class.js';

class LobbyCtrl {
    constructor($location) {
        this.$location = $location;

        this.User = new User;
        this.Form = new Form;

        this.init();
    }

    init() {
        this.stage = 1;
        var joiningGame = this.$location.search().game || false;

        if(joiningGame) {
            this.Form.fields.gameid = joiningGame;
        }
    }

    createGame() {
        console.log('Console');
    }

    joinGame() {

    }
}

LobbyCtrl.$inject = ['$location'];

export { LobbyCtrl }