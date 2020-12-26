var arr = [1, 3, 5, 7];
for (let i = 0; i < arr.length; i++) {
    console.log(arr[i]);
}
var arr = [2, 4, 6, 8];
for (let i = arr.length - 1; i >= 0; i--) {
    console.log(arr[i]);
}
var arr = [2, 4, 6, 8];
for (let i = 0; i < arr.length; i++) {
    if (i % 2 == 1) continue;
    console.log(i);
}
var arr = [2, 4, 6, 8];
for (let i = 0; i < arr.length; i++) {
    if (i % 2 == 0) console.log(i);
}

for (var i = 0; i < 10; i++) {
    if (i < 5) {
        i++;
        continue;
    }
    if (i > 7) {
        i += 2; //8+2
        break;
    }
    i += 1;
}
console.log(i); //10

for (var i = 1; i <= 10; i += 2) {
    if (i <= 5) {
        i++; // 2 5
        continue;
    } else {
        i -= 2; //5
        break;
    }
    i--;
    console.log(i);
}
console.log(i); //5

