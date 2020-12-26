var obj = { name: "lion" };
obj = null;

function fn(x) {
    return function (y) {
        return x + y;
    };
}
var f = fn(1);

var arr = [];
function fn() {
    arr = [1, 2, 3];
}
fn();

function fn(x) {
    return function (y) {
        return x + y;
    };
}
fn(1)(2); // fn(1)执行完毕不销毁，等待 fn(1)(2)政治执行完毕销毁