var arr1 = [1, 2, 3];
var arr2 = [4, 5, 6];
var arr3 = arr1.concat(arr2);
var arr4 = [...arr1, ...arr2];
console.log(arr3, arr4); // 都是 [ 1, 2, 3, 4, 5, 6 ]

var obj1 = { name: "lion" };
var obj2 = { age: 10 };
var obj3 = Object.assign(obj1, obj2);
var obj4 = { ...obj1, ...obj2 };
console.log(obj3, obj4); // 都是 { name: 'lion', age: 10 }

// 剩余运算符，把剩余的项装到一个数组汇总
function fn(x, y, ...arg) {
    console.log(arg);
}
fn(1, 2, 3, 4, 5); // [ 3, 4, 5 ]
var [a, ...arg] = [1, 2, 3, 4, 5];
console.log(a, arg); // 1 [ 2, 3, 4, 5 ]
