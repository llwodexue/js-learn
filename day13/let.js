let a = 10,
    b = 10;
let fn = function () {
    let a = (b = 20);
    console.log(a, b);
};
fn();
console.log(a, b);
// 20 20
// 10 20

/*
    私有作用域 fn(a)
    1.形参赋值 a=12; a是私有的
    2.变量提升 var b; b是私有的
        只有 c 是全局作用域的
    3.代码自上而下执行
*/
var a = 12,
    b = 13,
    c = 14;
function fn(a) {
    console.log(a, b, c);
    var b = (c = a = 20);
    console.log(a, b, c);
}
fn(a);
console.log(a, b, c);
// 12 undefined 14
// 20 20 20
// 12 13 20

/*
    1.变量提升：fn -> 0x111(全局)；arr -> 0x222(全局)
    2.代码自上而下执行，执行 fn(arr)
        1.形参赋值 arr -> 0x222[12, 13]
        2.重新赋值 arr[0]=100 -> 0x222[100, 13]
        3.arr=[100] -> 0x333[100](函数fn中)
        4.arr[0]=0 -> 0x333[0]
*/
var arr = [12, 13];
function fn(arr) {
    console.log(arr);
    arr[0] = 100;
    arr = [100];
    arr[0] = 0;
    console.log(arr);
}
fn(arr);
console.log(arr);
// [12,13]
// [0]
// [100,13]

var a = 1;
var obj = {
    b: 2,
};
var fn = function () {};
fn.c = 3;

function test(x, y, z) {
    x = 4;
    y.b = 5;
    z.c = 6;
    return z;
}
test(a, obj, fn);
console.log(a + obj.b + fn.c);


