'use strict';

import { Form } from '../form/form.class.js';
import { Message } from '../message/message.class.js';
import { Socket } from '../socket/socket.class.js';
import { Room } from '../room/room.class.js';
import { Player } from '../player/player.class.js';
import { Notify } from '../notify/notify.class.js';

class LobbyCtrl {
    constructor($location, $rootScope) {
        this.$location = $location;
        this.$rootScope = $rootScope;
        this.LoginForm = new Form;
        this.Room = new Room;

        this.socket = new Socket();
        this.init();
        this.socket.on('connected user', (user) => {
            this.Room.users.push(user);
            new Notify({
                title: 'New player joined',
                body: user + ' has joined the game'
            });
        });
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
                this.Room.id = data.gameID;
                this.Room.users = data.users;
                this.Room.master = data.users.shift();

                this.Room.Player = new Player({
                    name: data.user
                });

                this.$location.search('game', data.gameID);

                this.stage = 2;
                this.LoginForm.properties.inProgress = false;
            });
        });
    }

    joinGame() {
        this.socket = new Socket({forceNew: true});

        this.LoginForm.properties.inProgress = true;

        this.LoginForm.messages = [];

        this.socket.emit('join', {
            username: this.LoginForm.fields.username,
            gameID: this.LoginForm.fields.gameid
        });

        this.socket.on('login error', (response) => {
            this.$rootScope.$apply(() => {
                this.LoginForm.messages.push(new Message(response));
                this.LoginForm.properties.inProgress = false;
            });
        });

        this.socket.on('login', (data) => {
            this.$rootScope.$apply(() => {
                this.Room.id = data.gameID;
                this.Room.users = data.users;
                this.Room.master = data.users.shift();

                this.Room.Player = new Player({
                    name: data.user
                });

                this.$location.search('game', data.gameID);

                this.stage = 2;
                this.LoginForm.properties.inProgress = false;
            });
        });
    }
}

LobbyCtrl.$inject = ['$location', '$rootScope'];

export { LobbyCtrl }