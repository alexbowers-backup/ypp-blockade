class User {
    constructor() {

    }

    validate(username) {
        var regex = /^(?=.{4,12}$)[A-Za-z0-9]+(?:[_][A-Za-z0-9]+)*$/;

        return !(!regex.test(username) || username === null);
    }
}

export { User };