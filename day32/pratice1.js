Array.prototype.myForeach = function (callBack) {
    for (let i = 0; i < this.length; i++) {
        const item = this[i],
            index = i;
        callBack(item, index);
    }
}
let arr = [1, 2, 3]
arr.myForeach(function (item, index) {
    console.log(item, index);
})

Array.prototype.myMap = function (callBack) {
    let arr = []
    for (let i = 0; i < this.length; i++) {
        const item = this[i],
            index = i;
        arr[i] = callBack(item, index);
    }
    return arr;
}
let res = arr.myMap(function (item, index) {
    return item * 10
})
console.log(res);


Array.prototype.myReduce = function (callBack, initial) {
    let i = 0;
    for (; i < this.length; i++) {
        callBack(initial, this[i], i);
    }
}