function Fn(x,y){
    var total=x+y;
    // this  window （普通函数）
    // this f1 (类)
    this.a=x;
    this.b=y;
    this.total=total;
    function fn(){
      return x+y
    }
}

Fn(1,2); // 普通函数
var f1=new Fn(2,3);// 类

var obj={};
obj.name="li";

Fn.age=100; // 对象

var f2=new Fn(4,5);
console.log(f2.age)

