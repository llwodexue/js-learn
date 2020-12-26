var n;
function A() {
    var n = 3;
    function fn() {
        console.log(n);
    }
    fn();
}
A();

function A() {
    function B() {
        function C() {}
    }
}

var n = 3;
function fn() {
    console.log(n);
}
function sum() {
    var n = 6;
    fn();
}
fn();
sum();

/*
    fn->0x111
    f->0x222
*/
var n = 10;
function fn() {
    var n = 20;
    function f() {
        n++;
        console.log(n);
    }
    f();
    return f;
}
var x = fn(); // 21
x(); // 22
fn(); // 21
console.log(n); // 10

// 函数每次执行都会开辟一个新的栈内存
function fn() {
    return function f() {};
}
fn();
fn()(); // 相当于 f()

{
}
+[]; // 0



