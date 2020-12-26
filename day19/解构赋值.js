var [a, b, c] = [1, 2, 3];
console.log(a, b, c); // 1 2 3

// 用逗号进行占位
var [a, , , c] = [1, 2, 3, 4];
console.log(a, c); // 1 4

// 如果右边没有对应的那项，获取的就是 undefined
var [a, b, c] = [1, 2];
console.log(c); // undefined

// 多维数组解构。需一一对应
var [, [, a]] = [1, [2, 3]];
console.log(a); // 3

// 默认值：如果那个值是绝对等于undefined，就返回默认值
var [a, b, c = 10] = [1, 2];
console.log(c); // 10

// 可以使用扩展运算符
var [a, ...arr] = [1, 2, 3, 4];
console.log(a, arr); // 1 [ 2, 3, 4 ]
// 数组克隆
var [...arr] = [1, 2, 3, 4];
console.log(arr); // [ 1, 2, 3, 4 ]

// 对象解构赋值跟属性名有关（跟顺序无关）
var { age, name } = { name: "lion", age: 6 };
console.log(name, age); // lion 6

//如果没有对应的项，值就是 undefined
var { age, name } = { name: "bird" };
console.log(name, age); // bird undefined

// 默认值：如果那个值是绝对等于undefined，就返回默认值
var { age = 100, name } = { name: "cat" };
console.log(name, age); // cat 100

// 可以起别名
var { age: a, name } = { name: "dog", age: 7 };
console.log(name, a); // dog 7

// 如果属性名和属性值相同，可以省去一个
function fn() {
    console.log("say");
}
var obj = {
    fn,
};
obj.fn(); // say

function fArr([x, y]) {
    console.log(x, y);
}
var arr = [1, 2];
fArr(arr); // 1 2
function fObj({ age: a }) {
    console.log(a);
}
var obj = { name: "dog", age: 7 };
fObj(obj); // 7
