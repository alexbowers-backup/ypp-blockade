class Images {
    constructor() {
        this.images = {};
    }

    get(name) {
        if(typeof this.images[name] == 'undefined') {
            throw new Error("The image " + name + " has not been initialised");
        }
        return this.images[name];
    }

    set(name, location) {
        var image = new Image();
        image.src = '/images/' + location + '.png';
        this.images[name] = image;
    }
}

export { Images };