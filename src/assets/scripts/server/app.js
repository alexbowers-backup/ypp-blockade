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
    client.on('create', function (player) {
        if (!User.validate(player.name)) {
            client.emit('login error', {
                type: 'danger',
                text: 'Your username is not valid'
            });
        } else {
            client.gameID = Game.generateRoomId(io);

            io.rooms[client.gameID] = room = {users: []};

            Game.joinRoom(client, client.gameID, player, room);
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
        if (client.username) {
            Game.leaveRoom(client, room);
            client.broadcast.emit('disconnected user', {user: client.username, users: room.users});
        }
    });

    client.on('start', function() {
        room.isStarted = true;
        room.ships = [];

        room.users.forEach(function(user, i) {
            var team = i % 2 ? 'right' : 'left';
            var coords = {};

            if (team == 'right') {
                coords = {x: 0, y: 3};
            } else if (team == 'left') {
                coords = {x: 0, y: 3};
            }

            room.ships.push(new Ship({

            }));
        });
    });
});
