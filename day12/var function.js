function a() {}
var a;
if (false) {
    var a;
    function a() {}
}

var a = 0;
if (true) {
    console.log(a); // [Function: a]
    a = 5;
    function a() {}
    a = function () {};
    console.log(a); // 5
}
console.log(a); // 5

var a = 0;
for (var i = 0; i < 1; i++) {
    console.log(a); // [Function: a]
    a = 5;
    function a() {}
    console.log(a); // 5
}
console.log(a); // 5

var a = 6;
function fn(a) {
    console.log(a);  // undefined
    a = 1;
}
fn();
console.log(a);  // 6

console.log(fn);
if (true) {
    console.log(fn);
    fn = 3;
    function fn() {}
    fn = 5;
    console.log(fn);
}
console.log(fn);

console.log(a, b);
var a = 12,
    b = 12;
function fn() {
    // 变量提升 var a；a 是私有的， b是 windows 全局作用域
    console.log(a, b);
    // 下面语句相当于 b=13; var a=b
    var a = b = 13;
    console.log(a, b);
}
fn();
console.log(a, b);
