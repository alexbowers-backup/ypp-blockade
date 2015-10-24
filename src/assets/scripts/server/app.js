var express = require('express'),
    socket = require('socket.io');

var port = 4000;
var app = express();

var io = socket.listen(app.listen(port));

app.use(express.static(__dirname + '/../../../../public'));

io.sockets.on('connection', function (client) {

});