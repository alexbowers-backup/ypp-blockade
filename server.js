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
        client.username = username;
        room.users.push(username);

        client.emit('login', {
            user: username,
            users: room.users,
            gameID: client.gameID
        });
    });
});

function createRoom() {
    var gameId = '';

    for( var i = 0; i < 8; i++) {
        gameId += Math.floor(Math.random() * 10);
    }

    if( io.rooms[gameId] === undefined) {
        io.rooms[gameId] = {
            users: []
        };

        return gameId;
    }

    return createRoom();
}