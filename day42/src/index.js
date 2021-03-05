function deepClone(source) {
    if (source instanceof Object) {
        let dist = null;
        let cache = [];
        if (source instanceof Array) {
            dist = new Array();
        } else if (source instanceof Function) {
            dist = function () {
                return source.apply(this, arguments);
            };
        } else {
            dist = new Object();
        }
        for (let key in source) {
            if(ch)
            dist[key] = deepClone(source[key]);
        }
        return dist;
    }
    return source;
}
module.exports = deepClone;
