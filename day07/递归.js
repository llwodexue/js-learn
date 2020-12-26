// 求1-100的所有数之和
// function fn(num) {
//     console.log(num);
//     if (num >= 10) {
//         return;
//     }
//     return fn(num + 1);
// }
// fn(1);

// function fn1(start, end) {
//     var sum = 0;
//     for (start; start <= end; start++) {
//         sum += start;
//     }
//     console.log(sum);
//     return sum;
// }
// fn1(1, 100);

// function total(num, end) {
//     if (num > end) {
//         return 0;
//     }
//     return num + total(num + 1, end);
// }
// console.log(total(1, 100));

function fn2(num, end) {
    if (num > end) {
        return 0;
    }
    if (num % 4 == 0 && num % 6 == 0) {
        console.log(num);
        return num + fn2(num + 1, end);
    }
    return fn2(num + 1, end);
}
console.log(fn2(1, 100));

var sum = 0;
for (var i = 1; i <= 100; i++) {
    if (i % 2 == 0 && i % 3 == 0) {
        sum += i;
    }
}
console.log(sum);
