var express = require('express'),
    socket = require('socket.io');

var port = 4000;
var app = express();

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
