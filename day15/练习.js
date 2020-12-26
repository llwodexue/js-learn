// 1.
function Fn() {
    this.x = 100;
    this.y = 200;
    this.getX = function () {
        console.log(this.x);
    };
}
Fn.prototype.getX = function () {
    console.log(this.x);
};
Fn.prototype.getY = function () {
    console.log(this.y);
};
var f1 = new Fn();
var f2 = new Fn();
console.log(f1.getX == f2.getX); // false
console.log(f1.getY == f2.getY); // true
console.log(f1.__proto__.getY == Fn.prototype.getY); // true
console.log(f1.__proto__.getX == f2.getX); // false
console.log(f1.getX === Fn.prototype.getX); // false
// f1没有constructor，去f1.__proto__=Fn.prototype找，找到constructor为Fn
console.log(f1.constructor); // Fn
console.log(Fn.prototype.__proto__.constructor); // Object
f1.getX(); // 100
// Fn.prototype
f1.__proto__.getX(); // undefined
f2.getY(); // 200
Fn.prototype.getY(); // undefined

// 2.
var fullName = "lion";
var obj = {
    fullName: "bird",
    prop: {
        getFullName: function () {
            return this.fullName;
        },
    },
};
// obj.prop..fullName
console.log(obj.prop.getFullName()); // undefined
var test = obj.prop.getFullName;
// window.fullName
console.log(test()); // lion

// 3.
var name = "lion";
var Tom = {
    name: "bird",
    show: function () {
        console.log(this.name);
    },
    wait: function () {
        var fun = this.show;
        fun();
    },
};
// wait前有. this为Tom var fun = Tom.show()
// 调用时 fun()前没有. this为window window.name
Tom.wait(); // lion

// 4.
var a = 1;
function fun() {
    this.a = 0;
    this.b = function () {
        console.log(this.a);
    };
}
fun.prototype = {
    b: function () {
        this.a = 20;
        console.log(this.a);
    },
    c: function () {
        this.a = 30;
        console.log(this.a);
    },
};

var my_fun = new fun();
var f = my_fun.b(); // 0
var fn = my_fun.b;
fn(); // 1

// 5.
var n = 2;
var obj = {
    n: 3,
    fn: (function (n) {
        n += 2;
        this.n += 2;
        var n = 5;
        return function (m) {
            this.n *= 2;
            console.log(m + ++n);
        };
    })(n),
};
// [w]n=2 [s]n=4 [w]n=4 [s]n=5
var fn = obj.fn;
// [s]m=3 [w]n=4*2=8 [p]3+ ++5=9 [s]n=6
fn(3);
obj.fn(3); // [o]3*2=6 [p]3+ ++6=10 [s]n=7
console.log(n, obj.n); // 8 6


var num = 10;
var obj = { num: 20 };
obj.fn = (function (num) {
    this.num = num * 3;
    num++;
    return function (n) {
        this.num += n;
        num++;
        console.log(num);
    };
})(obj.num);
var fn = obj.fn;
fn(5);
obj.fn(10);
console.log(num, obj.num);
[w]num=60 [s]21
[w]num=65 [s]22 [p]22
[o]num=30 [s]23 [p]23
[p]65 30
