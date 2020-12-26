/* 
单例设计模式：

*/

var name="li";

var name="da"

var obj1={
    name="li",
    age:18
}

var utils=(function(){
    var num=0;
    function fn(){

    } 
    // 获取数据
    function getDate(){

    }
    //绑定数据
    function bindHTML(){

    }
    return {
        //初始化
        init:function(){
            getDate();
            bindHTML()
        },
        fn2:fn
    }
})();

utils.init();

// 工厂 批量生产：封装

function fn(name,age){
    return {
        "name":name,
        "age":age
    }
}

var obj1=fn("wangzhe",18);
var obj2=fn("wangzhe",18);

/* 构造函数(类)：

 内置类：  Number String Boolean Null Undefined Function Object RegExp ...
 自定义类： 
*/


function Fn(){
   this.age=18;
   this.name="li",
   this.fn=function(){

   }
}

var f1=new Fn();// 一个函数在执行的时候，一旦加了new 这个函数就变成了构造函数 f1就是实例
var f2=new Fn();// 一个函数在执行的时候，一旦加了new 这个函数就变成了构造函数 f1就是实例
/* 
构造函数中的this就是当前的实例，通过this添加的属性名和属性值都是给当前的实例添加的
实例是对象数据类型
实例和实例是不相等的（空间地址不同）
构造函数中this添加的属性都是私有的
*/
console.log(f1==f2);// false

console.log(f1.age==f2.age);// 
console.log(f1.fn==f2.fn);// 

/* 
 在构造函数中：return人家是默认返回的，就是当前的实例，如果你手动去更改
 如果return 基本数据类型，不能覆盖
 如果return 引用数据类型，直接覆盖，就变成你的这个了
 或者只写了return 不能覆盖
 注意：在构造函数中少用return
*/

function Fn(){
    this.age=18;
    this.name="li";
    return 
}

var f1=new Fn();
console.log(f1);//{ age: 18, name: 'li' }

/* 
instanceof 主要用来判断某个实例是否隶属于某个类,返回结果是布尔数据类型
语法：实例 instanceof 类
比如：[1,2,3] instanceof Array

*/

function Fn(){
    this.age=18;
    this.name="li";
    return 
}

var f1=new Fn();


console.log(f1 instanceof Fn)
