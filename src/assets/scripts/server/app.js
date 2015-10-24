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

io.sockets.on('connection', function (client) {
    client.on('create', function(username) {
        if(!User.validate(username)) {
            client.emit('login error', {
                type: 'danger',
                text: 'Your username is not valid'
            });
        } else {
            console.log('Valid');
        }
    });

    client.on('join', function() {
       // pass
    });

    client.on('disconnect', function() {
       // pass
    });
});
