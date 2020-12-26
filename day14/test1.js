// 1.
/*
1.变量提升：a fn()
2.自上而下执行：fn()
    1.变量提升：a->undefined
*/
console.log(a);
var a = 12;
function fn() {
    console.log(a);
    var a = 13;
}
fn();
console.log(a);
// undefined undefined 12

// 2.
/*
1.变量提升：a fn()
2.自上而下执行：a->undefined fn
    1.fn当前作用域找不到 a，去上级查找
    2.a赋值13
*/
console.log(a);
var a = 12;
function fn() {
    console.log(a);
    a = 13;
}
fn();
console.log(a);
// undefined 12 13

// 3.
/*
1.变量提升：fn()
2.自上而下执行：window 找不到 a
*/
console.log(a);
a = 12;
function fn() {
    console.log(a);
    a = 13;
}
fn();
console.log(a);
// ReferenceError

// 4.
/*
1.变量提升：foo bar()
2.自上而下执行：bar()
    1.变量提升：foo->!undefined(true)
    2.赋值：foo->10
*/
var foo = 1;
function bar() {
    if (!foo) {
        var foo = 10;
    }
    console.log(foo);
}
bar();
// 10

// 5.
/*
1.变量提升：n a() c
2.自上而下执行：a() c()
    a()
    1.变量提升：n b()
    2.自上而下执行：b()
        1.n++
    3.返回函数体 b

    c()
    1.执行函数体b，b定义在a()
    2.n++
*/
var n = 0;
function a() {
    var n = 10;
    function b() {
        n++;
        console.log(n);
    }
    b();
    return b;
}
var c = a();
c();
console.log(n);
// 11 12 0

// 6.
/*
1.变量提升：a b c text(a)
2.自上而下执行：text(a)
    1.形参赋值a=10
    2.变量提升b
*/
var a = 10,
    b = 11,
    c = 12;
function text(a) {
    a = 1;
    var b = 2;
    c = 3;
}
text(10);
console.log(a);
console.log(b);
console.log(c);
// 10 11 3

// 7.
/*
1.变量提升：a
2.自上而下执行：!("a" in window) (undefined in window)->true 取反 false
*/
if (!("a" in window)) {
    var a = 1;
}
console.log(a);
// undefined

// 8.
/*
1.变量提升：a b(x,y,a)
2.自上而下执行：b(x,y,a)
    1.形参赋值a=3
    2.修改a的值
3.没有return 返回 undefined，赋值给 a
*/
var a = 4;
function b(x, y, a) {
    console.log(a);
    arguments[2] = 10;
    console.log(a);
}
a = b(1, 2, 3);
console.log(a);
// 3 10 undefined

// 9.
/*
1.变量提升：foo
2.自上而下执行：(function(foo){})(foo)
    1.形参赋值foo="hello"
    2.变量提升 foo，foo不会重复声明，值还是"hello""
    3."hello" || "world"->"hello"
3.自执行函数是块级作用域不会影响外面的 foo
*/
var foo = "hello";
(function (foo) {
    console.log(foo);
    var foo = foo || "word";
    console.log(foo);
})(foo);
console.log(foo);
// "hello" "hello" "hello"

// 10.
/*
1.变量提升：a fn() f
2.自上而下执行：f=fn()
    1.形成不销毁的作用域
    2.赋值a a不是私有的，把全局a改成0
    3.返回函数体
*/
var a = 9;
function fn() {
    a = 0;
    return function (b) {
        return b + a++;
    };
}
var f = fn();
console.log(f(5));
console.log(fn()(5));
console.log(f(5));
console.log(a);
// 5+0++ 5
// 5+0++ 5
// 5+1++ 6
// 2

// 11.
/*
1.变量提升：ary fn(ary) res
2.自上而下执行：fn(ary)
    1.赋值ary[1,2,3,4]->0x000
    2.修改ary[0,2,3,4]->0x000
    3.更改ary的地址[0]->0x111
    4.修改ary[100]->0x111
    5.返回ary
*/
var ary = [1, 2, 3, 4];
function fn(ary) {
    ary[0] = 0;
    ary = [0];
    ary[0] = 100;
    return ary;
}
var res = fn(ary);
console.log(ary);
console.log(res);
// [0,2,3,4]
// [100]

// 12.
/*
1.变量提升：fn(i) f
2.自上而下执行：fn(i)
    1.形参赋值i=10
    2.return 后面不进行变量提升
    3.形成不销毁作用域
    4.返回函数体
*/
function fn(i) {
    return function (n) {
        console.log(n + ++i);
    };
}
var f = fn(10);
f(20);
fn(20)(40);
fn(30)(50);
f(30);
// 20+ ++10 31
// 20+ ++40 61
// 30+ ++50 81
// 30+ ++11 42

// 13.
/*
1.变量提升：i fn() f
2.自上而下执行：fn()
    1.return 后面不进行变量提升
    2.形成不销毁作用域
    3.返回函数体
*/
var i = 10;
function fn() {
    return function (n) {
        console.log(n + ++i);
    };
}
var f = fn();
f(20);
fn()(20);
fn()(30);
f(30);
// 20+ ++10 31
// 20+ ++11 32
// 30+ ++12 43
// 30+ ++13 44

