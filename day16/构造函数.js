function Fn(name, age) {
    this.name = name;
    this.age = age;
}
// 往原型上扩展公有属性
Fn.prototype.say = function () {
    console.log(this.name, this.age);
};
var f1 = new Fn("lion", 18);
var f2 = new Fn("bird", 20);
f1.say();
f2.say();

// 返回值是新增数组的长度
Array.prototype.myPush = function () {
    for (var i = 0; i < arguments.length; i++) {
        this[this.length] = arguments[i];
    }
    return this.length;
};
var arr = [1, 2, 3];
console.log(arr.myPush(4, 5, 6));

var arr = [5, 7, 2, 4, 9];
arr.sort(function (a, b) {
    return a - b;
}).reverse().push(6);
arr.shift();
console.log(arr); // [ 7, 5, 4, 2, 6 ]