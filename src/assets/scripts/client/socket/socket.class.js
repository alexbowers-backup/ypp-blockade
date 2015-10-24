import io from 'socket.io-client';

class Socket {
    constructor(options) {
        options = options || null;

        if (options) {
            this.socket = io.connect('http://localhost:4000', options);
        } else {
            this.socket = io.connect('http://localhost:4000');
        }

        return this.socket;
    }
}

export { Socket };