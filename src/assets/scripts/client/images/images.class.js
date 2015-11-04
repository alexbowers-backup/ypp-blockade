class Images {
    constructor() {
        this.images = {};
    }

    get(name) {
        return this.images[name];
    }

    set(name, location) {
        var image = new Image();
        image.src = '/images/' + location + '.png';
        this.images[name] = image;
    }
}

export { Images };