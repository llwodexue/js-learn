Array.prototype.mySort = function (callBack) {
    if (this.length <= 1) {
        return this;
    }
    if (callBack instanceof Function) {
        for (let i = 0; i < this.length - 1; i++) {
            for (let j = 0; j < this.length - 1 - i; j++) {
                if (callBack(this[j], this[j + 1]) > 0) {
                    [this[j], this[j + 1]] = [this[j + 1], this[j]];
                }
            }
        }
    } else if (typeof callBack == "undefined") {
        for (let i = 0; i < this.length - 1; i++) {
            for (let j = 0; j < this.length - 1 - i; j++) {
                if (String(this[j]) > String(this[j + 1])) {
                    [this[j], this[j + 1]] = [this[j + 1], this[j]];
                }
            }
        }
    } else {
        return "参数异常";
    }
    return this;
};
console.log([12, 115, 4, 7, 1, 14].sort());
console.log([12, 115, 4, 7, 1, 14].mySort());
console.log(
    [12, 115, 4, 7, 1, 14].sort(function (a, b) {
        return a - b;
    })
);
console.log(
    [12, 115, 4, 7, 1, 14].mySort(function (a, b) {
        return a - b;
    })
);
console.log(
    [12, 115, 4, 7, 1, 14].sort(function (a, b) {
        return b - a;
    })
);
console.log(
    [12, 115, 4, 7, 1, 14].mySort(function (a, b) {
        return b - a;
    })
);
