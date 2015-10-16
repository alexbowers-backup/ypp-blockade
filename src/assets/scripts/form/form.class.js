class Form {
    constructor() {
        this.fields = {};
        this.properties = {};
        this.messages = [];
    }

    resetMessages() {
        this.messages = [];
    }
}

export { Form };