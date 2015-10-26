'use strict';

class GameCtrl {
    constructor() {
    }

    generateRoomId(io) {
        var gameId = '';

        for (var i = 0; i < 8; i++) {
            gameId += Math.floor(Math.random() * 10);
        }

        if (io.rooms[gameId] === undefined) {
            return gameId;
        } else {
            return this.generateRoomId(io);
        }
    }

    leaveRoom(client, room) {
        room.users.splice(room.users.indexOf(client.username), 1);
    }

    joinRoom(client, gameID, username, room) {

        if (room === undefined) {
            client.emit('login error', {
                type: 'danger',
                text: 'This game no longer exists'
            });

            client.disconnect();
            return false;
        }

        if (!/^[0-9]{8}$/.test(gameID)) {
            client.emit('login error', {
                type: 'danger',
                text: 'Invalid game ID'
            });

            client.disconnect();

            return false;
        }

        if (!/^(?=.{4,12}$)[A-Za-z0-9]+(?:[_][A-Za-z0-9]+)*$/.test(username) || username === null || username === undefined) {
            client.emit('login error', {
                type: 'danger',
                text: 'Your username is not valid'
            });

            client.disconnect();

            return false;
        }

        if (room.users.indexOf(username) !== -1) {
            client.emit('login error', {
                type: 'danger',
                text: 'This username is already taken'
            });

            client.disconnect();
            return false;
        }

        if (room.isStarted) {
            client.emit('login error', {
                type: 'danger',
                text: 'The game has already started'
            });

            client.disconnect();
            return false;
        }

        room.users.push(username);

        client.emit('login', {
            gameID: gameID,
            user: username,
            users: room.users
        });

        return true;
    }
}

export { GameCtrl }