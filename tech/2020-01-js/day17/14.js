Function.prototype.myCall=function(obj,...arg){
    obj=obj||window;
    var res=null;
    console.log(...arg);//[1,2]
    // this----fn
    // this()  可以让fn();
    // 如何去更改this（fn）里面的this指向
    obj.$fn=this;// obj.$fn=fn;
   res= obj.$fn(...arg);// fn
    delete obj.$fn;
   return res;
}

function fn(x,y){
    // 让此函数中的this改为obj
    console.log(this);
   return x+y;
}

// fn();
// obj.fn();


var obj={name:"li",fn:fn}
var res=fn.myCall(obj,1,2);
// fn1.myCall(obj,1,2)
/* 
1、 让fn 这个函数执行
2、 改变fn这个函数里面的this指向----obj

*/