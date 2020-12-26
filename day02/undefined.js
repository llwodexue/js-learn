var name;
console.log(name); // undefined

// 想要获取对象的属性值，里面没有对应的属性，该属性为 undefined
var obj = { name: "lion" };
console.log(obj.age); // undefined

// 函数里设置了形参，在调用的时候没有传实参，该参数等于undefined
function fn(x, y) {
    console.log(x+y); // NaN
}
fn();

// 函数没有 return 返回值，默认返回undefined
function add(x, y) {
    var sum = x + y;
}
var res = add(1, 2);
console.log(res); // undefined
