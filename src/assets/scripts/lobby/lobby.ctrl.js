'use strict';

import { User } from '../user/user.class.js';
import { Form } from '../form/form.class.js';
import { Message } from '../message/message.class.js';
import { Socket } from '../socket/socket.class.js';

class LobbyCtrl {
    constructor($location, $rootScope) {
        this.$location = $location;
        this.$rootScope = $rootScope;

        this.User = new User;
        this.LoginForm = new Form;

        this.socket = new Socket();
        this.init();
    }

    init() {
        this.stage = 1;
        var joiningGame = this.$location.search().game || false;

        if (joiningGame) {
            this.LoginForm.fields.gameid = joiningGame;
        }
    }

    createGame() {
        this.socket = new Socket({forceNew: true});

        this.LoginForm.messages = [];

        this.socket.emit('create', this.LoginForm.fields.username);

        this.socket.on('login error', (response) => {
            this.$rootScope.$apply(() => {
                this.LoginForm.messages.push(new Message(response));
            });
        });
    }

    joinGame() {

    }
}

LobbyCtrl.$inject = ['$location', '$rootScope'];

export { LobbyCtrl }