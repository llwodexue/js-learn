// 非有效数字求和
function add() {
    var sum = 0;
    for (var i = 0; i < arguments.length; i++) {
        var el = Number(arguments[i]);
        if (!isNaN(el)) {
            sum += el;
        }
    }
    return sum;
}
console.log(add(1, "2", "123px", 3, null));
