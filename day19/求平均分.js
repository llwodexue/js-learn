function average() {
    var max = Math.max(...arguments);
    var min = Math.min(...arguments);
    var sum = 0;
    var n = 0;
    for (var i = 0; i < arguments.length; i++) {
        if (arguments[i] != max && arguments[i] != min) {
            sum += arguments[i];
            n++;
        }
    }
    return sum / n;
}
var res = average(2, 5, 3, 8, 4);
console.log(res);

function average(...arg) {
    var arr = arg.sort(function (a, b) {
        return a - b;
    });
    arr.pop();
    arr.shift();
    var total = 0;
    for (var i = 0; i < arr.length; i++) {
        total += arr[i];
    }
    return total / arr.length;
}
var res = average(2, 5, 3, 8, 4);
console.log(res);

function average(...arg) {
    var arr = arg.sort(function (a, b) {
        return a - b;
    });
    arr.pop();
    arr.shift();
    return eval(arr.join("+")) / arr.length;
}
var res = average(2, 5, 3, 8, 4);
console.log(res);

function average() {
    var max = Math.max(...arguments);
    var min = Math.min(...arguments);
    return (eval([...arguments].join("+")) - max - min) / (arguments.length - 2);
}
var res = average(2, 5, 3, 8, 4);
console.log(res);