// console.log(fn(1, 2));
// function fn(n, m) {
//     console.log(x);
//     var x = 3;
//     return n + m;
// }
// console.log(fn(1, 2));

// 不管条件是否成立，都会进行变量提升，var a
console.log(a); // undefined
if (1 == 2) {
    var a = 12;
}
console.log(a); // undefined

// 在新版本浏览器中，判断条件中的function相当于只声明未定义，所以undefined
console.log(fn); // undefined
// console.log(fn()); // fn is not a function
if (1 == 2) {
    function fn() {
        console.log(1);
    }
}
console.log(fn); // undefined

// 360
f = function () {
    return true;
};
g = function () {
    return false;
};
~(function () {
    if (g() && [] == ![]) {
        f = function () {
            return false;
        };
        function g() {
            return true;
        }
    }
})();
// g is not a function
console.log(f());
console.log(g());

console.log(fn);
if (1 == 1) {
    console.log(fn);
    function fn() {
        console.log("ok");
    }
}
console.log(fn);

var a = 0;
if (false) {
    console.log(a);
    a = 1;
    function a() {}
    a = 21;
    console.log(a);
}
console.log(a);

console.log(fn);
console.log(fn(1, 2));
var fn = function (n, m) {
    return n + m;
};
console.log(fn(3, 4));

function fn() {
    console.log(f2);
    console.log(f1);
    return function f1() {};
    function f2() {
        console.log("f2");
    }
}
fn();

console.log(num);
var num = 1;
console.log(num); // 1
var num = 2;
console.log(num);


/*
    function fn = 0x111
                = 0x222
                = 0x333
                = 0x444
 */
fn(); // 4
function fn() {
    console.log(1);
}
function fn() {
    console.log(2);
}
fn(); // 4
function fn() {
    console.log(3);
}
fn = 100;
function fn() {
    console.log(4);
}
fn(); // TypeError: fn is not a function

sum();
fn();
var fn = function () {
    console.log(1);
};

function sum() {
    console.log(2);
}

fn();
sum();
