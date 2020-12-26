// function A(name){
//     this.x=100;
//     this.y=200;
// }
// A.prototype.getA=function(){
//   console.log("getA")
// }
   A.prototype.f=100
// A.a=600;


class A{ // 既不是对象也是作用域
      constructor(name){
        this.x=100;
        this.y=200;
      }

      // 原型上的方法
      getA(){
        console.log("getA")
      }
      // 给实例添加私有属性
      f=300
      // 把A这个类当成对象，给它添加静态属性
      static a=600
      
}



var a=new A();

//A();  Class constructor A cannot be invoked without 'new'

