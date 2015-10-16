import io from 'socket.io-browserify';

class Socket {
    constructor() {
        this.socket = io.connect(window.location.href);
    }
}

export { Socket };