var i = 2;
var a = i++;
console.log(i); // 3
console.log(a); // 2

var j = 2;
var b = ++j;
console.log(j); // 3
console.log(b); // 3

var arr = [1, 3, 5, 7];
for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < i; j++) {
        if (arr[j] == 1) {
            break;
        }
        console.log(`j  ${arr[j]}`); // 没有输出
    }
    console.log(`i  ${arr[i]}`);
    // i  1
    // i  3
    // i  5
    // i  7
}