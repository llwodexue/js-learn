function myMap(callBack) {
    let ary = [];
    for (var i = 0; i < this.length; i++) {
        let res = callBack(this[i], i);
        ary.push(res);
    }
    return ary;
}
Array.prototype.myMap = myMap;
let res = [100, 200, 300, 400].myMap((item, index) => {
    return 1;
});
console.log(res);

Array.prototype.myIndexOf = function (val) {
    for (let i = 0; i < this.length; i++) {
        if (this[i] === val) {
            return i;
        }
    }
    return -1;
};
Array.prototype.myIncludes = function (val) {
    for (let i = 0; i < this.length; i++) {
        if (this[i] === val) {
            return true;
        }
    }
    return false;
};
console.log([1, 3, 5, 7, 5, 8].myIncludes(5));
console.log([1, 3, 5, 7, 5, 8].myIncludes(6));
console.log([1, 3, 5, 7, 5, 8].myIncludes("5"));
console.log([1, 3, 5, 7, 5, 8].includes(5));
console.log([1, 3, 5, 7, 5, 8].includes(6));
console.log([1, 3, 5, 7, 5, 8].includes("5"));

Array.prototype.myReverse = function () {
    for (let i = 0, j = this.length - 1; j > i; i++, j--) {
        var temp = this[i];
        this[i] = this[j];
        this[j] = temp;
    }
    return this;
};
var arr = [1, 3, 5, 7, 5, 8];
console.log(arr.myReverse());
console.log(arr);
