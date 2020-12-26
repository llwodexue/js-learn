~(function () {
    function jQuery() {
        console.log("hello");
    }
    // 暴露给全局
    window.$ = jQuery;
})();
window.$();

var utils = (function () {
    var num = 0;
    function fn() {
        console.log("hello");
    }
    // 暴露给全局
    return {
        fn: fn,
    };
})();

utils.fn();


/*
    1.fn->0x111
    2.var f
    3.fn(2)==私有作用域
        形参赋值：i=2
        f=fn(2) 形成了不销毁的作用域
*/
function fn(i) {
    return function (n) {
        console.log(n + ++i);
    };
}
var f = fn(2);
f(3); // 6
fn(5)(6); // 12
fn(7)(8); // 16
f(4); // 8
