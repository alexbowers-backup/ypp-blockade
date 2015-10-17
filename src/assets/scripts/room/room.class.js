class Room {
    constructor() {
        this.users = null;
        this.user = null;
        this.master = null;
        this.id = null;
    }

    isMaster() {
        return this.master === this.user;
    }
}

export { Room };