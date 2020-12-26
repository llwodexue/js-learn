var obj = { name: "lion", tel: 123};
// 增加
obj.age = 18;
// 修改
obj.name = "bird";
// 彻底删除
delete obj.age
// 删除，属性名还在
obj.tel = null
// 查找
console.log(obj["tel"]);
console.log(obj);
console.log(obj.email);
