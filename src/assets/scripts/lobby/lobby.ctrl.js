'use strict';

import { User } from '../user/user.class.js';
import { Form } from '../form/form.class.js';
import { Message } from '../message/message.class.js';
import { Socket } from '../socket/socket.class.js';
import { Room } from '../room/room.class.js';

class LobbyCtrl {
    constructor($location, $rootScope) {
        this.$location = $location;
        this.$rootScope = $rootScope;

        this.User = new User;
        this.LoginForm = new Form;
        this.Room = new Room;

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

        this.LoginForm.properties.inProgress = true;

        this.LoginForm.messages = [];

        this.socket.emit('create', this.LoginForm.fields.username);

        this.socket.on('login error', (response) => {
            this.$rootScope.$apply(() => {
                this.LoginForm.messages.push(new Message(response));
                this.LoginForm.properties.inProgress = false;
            });
        });

        this.socket.on('login', (data) => {
            this.$rootScope.$apply(() => {
                this.Room = {
                    users: data.users,
                    user: data.user,
                    id: data.gameID
                };

                this.$location.search('game', data.gameID);

                this.stage = 2;
                this.LoginForm.properties.inProgress = false;
            });
        });

        //this.login();
    }

    joinGame() {


        //this.login();
    }

    login() {
        this.socket.on('login', (data) => {
            console.log(this.Room);
        });
    }
}

LobbyCtrl.$inject = ['$location', '$rootScope'];

export { LobbyCtrl }