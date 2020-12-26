Function.prototype.myCall=function(obj,...arg){
    obj=obj||window;
    // res 就是函数执行的返回结果，把结果返回出去
   var res=null;  
   console.log(arg);//[1,2]
  // this();
  obj.$fn=this;
  res= obj.$fn(...arg);//this()
  delete obj.$fn;
  return res;
}

var obj={"name":"li"}
function fn(x,y){
  console.log(this);
  return x+y;
}

var res=fn.myCall(obj,1,2);