var obj = { name: "lion", age: { con: 6 } };
// // 转成 JSON 格式字符串
// var res = JSON.stringify(obj);
// console.log(res);
// // 转成 JSON 格式对象
// var re = JSON.parse(res);
// console.log(re);

var obj2 = {};
for (var key in obj) {
    obj2[key] = obj[key];
}
var obj3 = JSON.parse(JSON.stringify(obj));
obj2.age.con = 3;
console.log(obj);
console.log(obj2);
console.log(obj3);

