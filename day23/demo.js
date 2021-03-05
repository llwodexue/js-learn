function Fn(n, m) {
    n = n || 0;
    m = m || 0;
    this.x = n;
    this.y = m;
    this.getX = function () {
        console.log(this.x);
    };
    return n + m;
}
Fn.prototype.sum = function () {
    console.log(this.x + this.y);
};
Fn.prototype = {
    getX: function () {
        this.x += 1;
        console.log(this.x);
    },
    getY: function () {
        this.y -= 1;
        console.log(this.y);
    },
};
let f1 = new Fn(10, 20);
let f2 = new Fn();
console.log(f1.getX === f2.getX); // false
console.log(f1.getY === f2.getY); // true
console.log(f1.__proto__.getY === Fn.prototype.getY); // true
console.log(Fn.prototype.getX === f2.getX); // false
console.log(f1.constructor); // Fn
f1.getX(); // 10
Fn.prototype.getX(); // NaN
f2.getY(); // -1
Fn.prototype.getY(); // NaN
f1.sum(); // 报错
//////////
//////////
var name = "window";
function A() {
    console.log(1, this.name);
    name = this.name;
}
function B() {
    name = this.name;
    console.log(2, this.name);
}
A.call(B, 10); // 1 B
A.call.call.call(B); // 2
Function.prototype.call(B); // 空
Function.prototype.call.call.call(B); // 2
///////////
//////////
var prints = function () {
    console.log(1);
};
function Fn() {
    prints = function () {
        console.log(2);
    };
    return this;
}
function prints() {
    console.log(3);
}
Fn.prototype.prints = function () {
    console.log(4);
};
Fn.prints = function () {
    console.log(5);
};
prints(); //1
Fn.prints(); //5
Fn().prints(); //2
prints(); //2
new Fn.prints(); // 5
new Fn().prints(); // 4
//////////
//////////
var name = "window";
function fn() {
    console.log(this.name);
}
var obj = {
    name: "obj",
    fn: () => {
        console.log(this.name);
    },
};
fn(); // window
obj.fn(); // window
fn.call(obj); // obj
window.onload = function () {
    fn();
    obj.fn(); //obj
};
fn.bind(obj);
//////////
//////////
var a = new Set([4, 4, 5, 6, 7, 6]);
a = [...a];
console.log(a); // [ 4, 5, 6, 7 ]
