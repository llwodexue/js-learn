/* 
call 继承： B类和A类，想要让B类的实例拥有A类实例的私有属性，我们可以让A当成普通函数执行，把里面的this指向进行更改成B类的实例（往B的实例上去添加属性）
*/

function A(){
    this.a="a";
    this.x=100;
}

function B(){
    //实例 b this
    A.call(this);
    this.b="b";
    this.y=200;
}

var b=new B();
console.log(b);


// var name="li";
// function fn(){
//     console.log(this.name);
// }

// // fn();
// var obj={
//     name:"aa"
// }

// console.log(fn.call(obj))


