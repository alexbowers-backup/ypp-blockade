import io from 'socket.io-client';

class Socket {
    constructor() {
        this.socket = io.connect('http://localhost:4000');
    }
}

export { Socket };