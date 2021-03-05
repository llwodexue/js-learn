Array.prototype.myFind = function (callBack) {
    for (let i = 0; i < this.length; i++) {
        if (callBack(this[i], i)) return this[i]
    }
}

Array.prototype.mySome = function (callBack) {
    for (let i = 0; i < this.length; i++) {
        if (callBack(this[i], i)) return true
    }
    return false
}

Array.prototype.myEvery = function (callBack) {
    for (let i = 0; i < this.length; i++) {
        if (!callBack(this[i], i)) return false
    }
    return true
}

Array.prototype.myFilter = function (callBack) {
    if (!Array.isArray(this) || !this.length || typeof callback !== 'function') {
        return []
    }
    let arr = [];
    for (let i = 0; i < this.length; i++) {
        if (!callBack(this[i], i)) {
            arr.push(this[i]);
        }
    }
    return arr
}