console.log(a);
var a=3;
var a=6;

// 在es6中是没有变量提升的
console.log(b);

// 在同一个作用域下，不允许重复声明一个变量
let b=6;
let b=7;//Identifier 'b' has already been declared
// 块级作用域

let c=3;
{
  let c=5;
  console.log(c);
}
console.log(c);



let c=3;
{
  
  console.log(c);
}
console.log(c);


{
    let d=4;
}

console.log(d);


let a;
a=3;
console.log(a);

// const 定义一个常量，必须在声明的时候就给一个初始值
const f;
f=5;
console.log(f);


// console.log(g);
// let g=3;



console.log(typeof h) //"undefined"

console.log(typeof g)
let g=3;

// 父作用域：控制循环的轮数
// 子作用域：循环几次就会有几个
for(let i=0;i<3;i++){
    
}