/* 
 对象的解构赋值
*/


var obj={
    name:"li",
    age:10,
}

var name=obj.name;
var age=obj.age;

// 对象的解构赋值跟属性名有关(跟顺序是无关的)
let {age,name}={name:"li",age:10};
console.log(name,age);

// 如果没有对应的项 值就是undefined
let {age,name}={name:"li"};
console.log(name,age);

// 用等号可以设置默认值，只要是绝对等于undefined 就走默认值
let {age=100,name}={name:"li",age:"200"};
console.log(name,age);


//可以起别名
let {age:a,name}={name:"li",age:10};
console.log(a);


function fn(){
    console.log(1)
}
let obj={
    fn
}
obj.fn();