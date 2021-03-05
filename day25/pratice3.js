Array.prototype.mySplice = function (start, del) {
    let arr = [];
    if (start < 0) {
        start = -start > this.length ? 0 : this.length + start;
    }
    if (arguments.length <= 1) {
        for (let i = start; i < this.length; i++) {
            arr.push(this[i]);
        }
        this.length = start;
    } else {
        del = del < 0 ? 0 : del;
        // 删除数组这一步
        for (let i = 0; i < del; i++) {
            arr.push(this[start + i]);
            this[start + i] = this[start + i + del];
        }
        this.length -= del;
        let lArr = [];
        for (let i = 0; i < start; i++) {
            lArr.push(this[i]);
        }
        for (let i = 0; i < arguments.length - 2; i++) {
            lArr.push(arguments[i + 2]);
        }
        for (let i = start; i < this.length; i++) {
            lArr.push(this[i]);
        }
        for (let i = 0; i < lArr.length; i++) {
            this[i] = lArr[i];
        }
    }
    return arr;
};
var arr1 = [1, 2, 3, 4, 5];
console.log(arr1.splice(0));
console.log(arr1);

var arr2 = [1, 2, 3, 4, 5];
console.log(arr2.mySplice(0));
console.log(arr2);
