let a = {
    name: "lion",
    age: 13,
};
let b = {
    name: "bird",
    time: "3",
};
// 从第二个参数开始，把对象里的所有键值对放到第一个参数里
let res1 = Object.assign({}, a, b);
console.log(res1); // { name: 'bird', age: 13, time: '3' }

let res2 = { ...a, ...b };
console.log(res2); // { name: 'bird', age: 13, time: '3' }
