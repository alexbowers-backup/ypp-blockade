class Message {
    constructor(object) {
        object = object || {};
        this.type = object.type || null;
        this.text = object.text || null;
    }
}

export { Message };