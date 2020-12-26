var arr = [2, 5, 14, 7, 3];
arr.sort(function (a, b) {
    return a - b;
})[arr.length - 1];
arr.sort(function (a, b) {
    return a - b;
}).pop();
arr.sort(function (a, b) {
    return b - a;
})[0];
var max = arr[0];
for (var i = 1; i < arr.length; i++) {
    if (max < arr[i]) {
        max = arr[i];
    }
}
for (var i = 0; i < arr.length - 1; i++) {
    if (max < arr[i + 1]) {
        max = arr[i + 1];
    }
}

for (var i = 0; i < arr.length - 1; i++) {
    if (arr[i] > arr[i + 1]) {
        var temp = arr[i];
        arr[i] = arr[i + 1];
        arr[i + 1] = temp;
    }
}
Math.max(...arr);
Math.max.call(null, arr);
