var express = require('express'),
    socket = require('socket.io');

import * as GameModule from './game/game.module.js';
import * as UserClass from './user/user.class.js';

var port = 4000;
var app = express();

var Game = new GameModule.ctrl;
var User = new UserClass.User();

var io = socket.listen(app.listen(port));

app.use(express.static(__dirname + '/../../../../public'));

io.rooms = {};
io.sockets.on('connection', function (client) {
    var room;
    client.on('create', function (username) {
        if (!User.validate(username)) {
            client.emit('login error', {
                type: 'danger',
                text: 'Your username is not valid'
            });
        } else {
            client.gameID = Game.generateRoomId(io);

            io.rooms[client.gameID] = room = {users: []};

            Game.joinRoom(client, client.gameID, username, room);
        }
    });

    client.on('join', function (data) {
        // pass
        room = io.rooms[data.gameID];


        var test = Game.joinRoom(client, data.gameID, data.username, room);
        if (test) {
            client.broadcast.emit('connected user', data.username);
            client.username = data.username;
        } else {
            client.disconnect();
        }
    });

    client.on('disconnect', function () {
        if(client.username) {
            Game.leaveRoom(client, room);
            client.broadcast.emit('disconnected user', {user: client.username, users: room.users});
        }
    });
});
