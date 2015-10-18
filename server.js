var express = require('express'),
    socket = require('socket.io');

var port = 4000;
var app = express();

var io = socket.listen(app.listen(port));

app.use(express.static(__dirname + '/public'));

io.rooms = {};
io.sockets.on('connection', function (client) {
    var room;
    client.on('create', function (username) {
        var validUsernameRegExp = /^(?=.{4,12}$)[A-Za-z0-9]+(?:[_][A-Za-z0-9]+)*$/;

        if (!validUsernameRegExp.test(username) || username === null) {
            client.emit('login error', {
                type: 'danger',
                text: 'Your username is not valid'
            });

            client.disconnect();

            return;
        }

        client.gameID = createRoom();
        room = io.rooms[client.gameID];
        client.joinRoom({
            gameID: client.gameID,
            username: username
        });
    });

    client.joinRoom = function (data) {
        var room = io.rooms[data.gameID];

        if (room === undefined) {
            client.emit('login error', {
                type: 'danger',
                text: 'This game no longer exists'
            });

            return client.disconnect();
        }

        if (!/^[0-9]{8}$/.test(data.gameID)) {
            client.emit('login error', {
                type: 'danger',
                text: 'Your gameID is incorrect'
            });

            return client.disconnect();
        }

        if (!/^(?=.{4,12}$)[A-Za-z0-9]+(?:[_][A-Za-z0-9]+)*$/.test(data.username) || data.username === null) {
            client.emit('login error', {
                type: 'danger',
                text: 'Your username is not valid'
            });

            return client.disconnect();
        }

        if (room.users.indexOf(data.username) !== -1) {
            client.emit('login error', {
                type: 'danger',
                text: 'This username is already taken'
            });

            return client.disconnect();
        }

        if (room.isStarted) {
            client.emit('login error', {
                type: 'danger',
                text: 'The game has already started'
            });

            return client.disconnect();
        }

        room.users.push(data.username);

        client.emit('login', {
            user: data.username,
            users: room.users,
            gameID: client.gameID
        });
    };

    client.on('join', function (data) {
        return client.joinRoom(data);
    });
});

function createRoom() {
    var gameId = '';

    for (var i = 0; i < 8; i++) {
        gameId += Math.floor(Math.random() * 10);
    }

    if (io.rooms[gameId] === undefined) {
        io.rooms[gameId] = {
            users: []
        };

        return gameId;
    }

    return createRoom();
}