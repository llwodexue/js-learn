// var name="wangzhe";
// var age=18;
// var sex="女"


// var name="shuaiyuan";
// var age=20;
// var sex="男";

/* 
 把描述同一个事物的所有属性放到一个对象中，这样可以避免之间的相互冲突，这种模式就叫做单例设计模式

*/
var obj1={
    name:"wangzhe",
    age:18,
    sex:"女"
}
var obj2={
    name:"shuaiyuan",
    age:20,
    sex:"男"
}
console.log(obj1)
console.log(obj2)

/* 
高级单例设计模式
*/

var utils=(function(){
    var num=3;
    function fn(){

    }
    // ......
    return {
        num:num,
        fn:fn
    }
})();


// utils.fn()


var obj1={
    name:"wangzhe",
    age:18,
    sex:"女"
}
var obj2={
    name:"shuaiyuan",
    age:20,
    sex:"男"
}
var obj3={
    name:"shuaiyuan",
    age:20,
    sex:"男"
}

/* 
 工厂设计模式（函数封装）

*/

function person(name,age,sex){
    return {
        job:"前端开发攻城狮",
        name:name,
        age:age,
        sex:sex
    }
}

var p1=person("wangzhe",18,"女");
var p2=person("wangzhe",20,"女");

/* 
构造函数:
当函数执行的时候，前面一旦加了new，就变成了构造函数（类），
如果构造函数没有形参，在调用的时候可以直接省去（） //var f1= new Fn
f1、f2就变成实例,实例是对象数据类型,实例和实例是不相等的（空间地址不同）

内置类：Number String Boolean Null Undefined Function Object RegExp Math Date Array
自定类：


*/

function Fn(name,age){
    this.name=name;
    this.age=age;

}
var f1=new Fn("li",18);
var f2=new Fn("da",20);
console.log(f1==f2);

/* 
创建数组的两种方式：
1、构造函数（类）：
  通过此方式进行创建的时候，
    参数：1个的时候代表的是数组的长度
    参数>1,代表的是数组的每项
2、字面量的方式

*/
var f1=new Array(1,2,3);//[1, 2, 3] 
var f1=new Array(5);//创建了一个数组长度是5项的数组，但每项是空内容
var f2=[4,5,6];
