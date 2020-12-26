// var flag = 0;
// if (flag) {
//     console.log("真");
// } else {
//     console.log("假");
// }

// flag ? console.log("真") : console.log("假");

// var num = 12;
// if (num > 0) {
//     if (num < 10) {
//         num++;
//     } else {
//         num--;
//     }
// } else {
//     if (num == 0) {
//         num++;
//         num = num / 10;
//     }
// }
// console.log(num);
// num > 0
//     ? num < 10
//         ? num++
//         : num--
//     : num == 0
//     ? (num++, (num = num / 10))
//     : null;
// console.log(num);

var num = 6;
switch (true) {
    case num < 5:
        console.log("这个小于 5");
        break;
    case num === 5:
        console.log("这个等于 5");
        break;
    case num > 5:
        console.log("这个大于 5");
        break;
    default:
        console.log("这个大于 5");
}
console.log(num);

var score = 63;
switch (true) {
    case score > 90 && score <= 100:
        console.log("优");
        break;
    case score > 80 && score <= 90:
        console.log("良");
        break;
    case score > 59 && score <= 80:
        console.log("及格");
        break;
    case score > -1 && score <= 59:
        console.log("不及格");
        break;
    default:
        console.log("输入分值范围错误！");
        break;
}
