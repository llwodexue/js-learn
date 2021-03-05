Array.prototype.myReduce = function (callBack, initial) {
    if (typeof callBack !== "function") throw new TypeError("callBack must be function");
    let i = 0;
    if (typeof initial === "undefined") {
        initial = this[0];
        i = 1;
    }
    for (; i < this.length; i++) {
        initial = callBack(initial, this[i], i)
    }
    return initial;
};
let arr = [1, 3, 5]
let total = arr.myReduce((result, item, index) => result + item, 10)
console.log(total);