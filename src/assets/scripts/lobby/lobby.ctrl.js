'use strict';
import { User } from '../user/user.class.js';
import { Form } from '../form/form.class.js';
import { Message } from '../message/message.class.js';
import { Socket } from '../socket/socket.class.js';

class LobbyCtrl {
    constructor($location) {
        this.$location = $location;

        this.User = new User;
        this.LoginForm = new Form;

        this.LoginForm.messages.push(new Message({
            text: 'This is an error message',
            type: 'danger'
        }));

        this.socket = new Socket;

        this.init();
    }

    init() {
        this.stage = 1;
        var joiningGame = this.$location.search().game || false;

        if(joiningGame) {
            this.LoginForm.fields.gameid = joiningGame;
        }
    }

    createGame() {

    }

    joinGame() {

    }
}

LobbyCtrl.$inject = ['$location'];

export { LobbyCtrl }