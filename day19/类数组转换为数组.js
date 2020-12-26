function toArr(cArr) {
    var arr = [];
    for (var i = 0; i < cArr.length; i++) {
        arr.push(cArr[i]);
    }
    return arr;
}

function fn() {
    var res = toArr(arguments);
    console.log(res);
}
fn(1, 3, 5);

function toArr(cArr) {
    var arr = [];
    for (var key in cArr) {
        arr.push(cArr[key]);
    }
    return arr;
}
function fn() {
    console.log(arguments);
    var res = toArr(arguments);
    console.log(res);
}
fn(1, 3, 5);

Array.prototype.mySlice = function () {
    var arr = [];
    for (var i = 0; i < this.length; i++) {
        arr.push(this[i]);
    }
    return arr;
};
function fn() {
    var res = [].mySlice.call(arguments);
    console.log(res);
}
fn(1, 3, 5);

function fn() {
    var res = Array.from(arguments);
    console.log(res);
}
fn(1, 3, 5);

function fn() {
    var res = [...arguments];
    console.log(res);
}
fn(1, 3, 5);
var a = { 0: 1, 1: 3, 2: 5 };
console.log(...a);

function toArr(cArr) {
    return [].slice.call(cArr);
}
function fn() {
    var res = toArr(arguments);
    console.log(res);
}
fn(1, 3, 5);
