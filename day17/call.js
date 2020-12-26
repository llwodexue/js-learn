// ...arg 剩余运算符
Function.prototype.myCall = function (obj, ...arg) {
    obj = obj || window;
    var res = null;
    // this 就是 fn
    obj.$fn = this;
    // ..arg 展开运算符
    res = obj.$fn(...arg);
    delete $fn;
    return res;
};
var name = "bird";
var obj = { name: "lion" };
function fn(x, y) {
    return x + y;
}
console.log(fn.myCall(obj, 1, 2));
