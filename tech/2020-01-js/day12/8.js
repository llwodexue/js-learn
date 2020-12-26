/* 
2） 变量提升 只对等号左边的进行

*/


console.log(fn);// undefined
console.log(fn(1, 2)); // fn is not a function
var fn = function (n, m) {
    return n + m;
}
console.log(fn(3, 4));


/* 
3） 函数里面的return ，return下面的代码本身是不执行的，但是可以进行变量提升（f2进行变量提升），return 后面的代码不进行变量提升（f1不进行变量提升）

*/

function fn() {
    console.log(f1);
    return function f1() {
    }
    function f2() {
        console.log("f2")
    }
}
fn();