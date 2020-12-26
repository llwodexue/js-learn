function Fn(name,age){
    this.name=name;
    this.age=age;
}
// 往原型上拓展公有属性、方法
Fn.prototype.sayFn=function(){
   // 谁调用这个函数，这个函数里面的this就是谁
   // this
   alert("我的名字是："+this.name+"年龄是："+this.age)
}
var f1=new Fn("li",18);//{name:"li",age:18}
var f2=new Fn("li2",20);//{name:"li",age:18}

f1.sayFn();
f2.sayFn();


/* 


*/



Array.prototype.Mypush=function(){
    // 往末尾追加项的次数
    // this
   for(var i=0;i<arguments.length;i++){
       this[this.length]=arguments[i];
   }
   return this.length;

}

var ary=[1,2,3];

var res=ary.Mypush(4,5,6);// 返回值是新增数组的长度，原数组通过此方法，把选项往末尾添加

console.log(ary)

