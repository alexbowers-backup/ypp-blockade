var express = require('express');
var socket = require('socket.io');
var port = 4000;
var app = express();

var io = socket.listen(app.listen(port));
console.log('Server running on port ' + port);

app.use(express.static(__dirname + '/public'));

io.rooms = {};
io.sockets.on('connection', function (client) {
    var room;
    var sendLog = function (message) {
        io.sockets.emit('log', message);
    };

    client.on('create', function (username) {
        var regexp = /^(?=.{4,12}$)[A-Za-z0-9]+(?:[_][A-Za-z0-9]+)*$/;
        if (!regexp.test(username) || username === null) {
            client.emit('login error', 'Your username is incorrect');
            client.disconnect();
            return;
        }
        client.gameID = createRoom();
        client.join(client.gameID);
        room = io.rooms[client.gameID];
        client.username = username;
        room.users.push(client.username);

        client.emit('login', {
            user: username,
            users: room.users,
            gameID: client.gameID
        });

        logUserActions(client.username, 'connected to (' + client.gameID + ')');
    });

    client.on('join', function (data) {
        username = data.username;
        client.gameID = data.gameID;
        room = io.rooms[client.gameID];
        if (!/^[0-9]{6}$/.test(client.gameID) || room === undefined) {
            client.emit('login error', 'Your gameID is incorrect');
            return client.disconnect();
        }
        var regexp = /^(?=.{4,12}$)[A-Za-z0-9]+(?:[_][A-Za-z0-9]+)*$/;
        if (!regexp.test(username) || username === null) {
            client.emit('login error', 'Your username is incorrect');
            return client.disconnect();
        }
        if (!(room.users.indexOf(username) === -1)) {
            client.emit('login error', 'This username is already taken');
            return client.disconnect();
        }
        if (room.isStarted) {
            client.emit('login error', 'The game has already started');
            return client.disconnect();
        }
        client.join(client.gameID);
        client.username = username;
        room.users.push(client.username);
        client.emit('login', {
            user: username,
            users: room.users,
            gameID: client.gameID
        });
        client.broadcast.to(client.gameID).emit('connected user', client.username);
        logUserActions(client.username, 'connected (' + client.gameID + ')');
    });

    client.on('leave', function () {
        client.disconnect();
    });

    client.on('disconnect', function () {
        if (!client.username) return;
        if (client.username === room.users[0]){
            delete io.rooms[client.gameID];
            client.broadcast.to(client.gameID).emit('kick', 'Master left the room');
        }
        var index = room.users.indexOf(client.username);
        room.users.splice(index, 1);
        //var ship = getShip(room.ships, client.username);
        //ship.isDead = true;
        client.broadcast.to(client.gameID).emit('disconnected user', {
            user: client.username,
            users: room.users
        });
        sendLog('<b>' + client.username + '</b> has left the game');
        logUserActions(client.username, 'disconnected from (' + client.gameID + ')');
    });
});

function getTime() {
    var date = new Date();
    var time = [
        date.getHours() < 10 ? '0' + date.getHours() : date.getHours(),
        date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes(),
        date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds()
    ];
    return time.join(':');
}

function logUserActions (name, action) {
    console.log(
        getTime() +
        ' [' + name + '] ' +
        action
    );
}

function createRoom() {
    var gameID = '';
    for (var i = 0; i < 6; i++)
        gameID += Math.floor(Math.random() * 10);
    if (io.rooms[gameID] === undefined) {
        io.rooms[gameID] = {users: []};
        return gameID;
    }
    createRoom();
}