/* // 两数之和
function add(x, y) {
    return x + y;
}
console.log(add(1, 3));

var sum = (x, y) => x + y;
console.log(sum(2, 4));
 */


// 不确定参数
function total() {
    var sum = 0;
    for (let i = 0; i < arguments.length; i++) {
        var el = +arguments[i];
        if (!isNaN(el)){
            sum = sum + +el;
        }
    }
    return sum;
}
console.log(total("1", 3, "123px", 7, null));

function total() {
    var sum = 0;
    for (let i = 0; i < arguments.length; i++) {
        var el = Number(arguments[i]);
        if (!isNaN(el)){
            sum = sum + +el;
        }
    }
    return sum;
}
console.log(total("1", 3, "123px", 7, null));