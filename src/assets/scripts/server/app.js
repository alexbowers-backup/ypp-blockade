var express = require('express'),
    socket = require('socket.io');

import * as GameModule from './game/game.module.js';

var port = 4000;
var app = express();

var game = new GameModule.ctrl;

var io = socket.listen(app.listen(port));

app.use(express.static(__dirname + '/../../../../public'));

io.sockets.on('connection', function (client) {
    client.on('create', function() {
        // pass
    });

    client.on('join', function() {
       // pass
    });

    client.on('disconnect', function() {
       // pass
    });
});
