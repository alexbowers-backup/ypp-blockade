Number.prototype.in = function(array) {
    return (array || []).indexOf(this) !== -1;
};

export default Number;