// let x = [1, 2, 3];
// let y = x;
// let z = [4, 5, 6];
// y[0] = 10;
// y = z;
// z[1] = 20;
// x[2] = z = 30;
// console.log(x, y, z);

let x = { name: "lion", sex: "boy", age: 14 };
let y = x;
let z = { name: "bird", sex: "grid", age: 16 };
y.name = "cat";
y = z;
z.sex = "boy";
z.age = 20;
x.age = z = 30;
console.log(x, y, z);