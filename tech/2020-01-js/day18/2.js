var name="window"
function fn(x,y){
    //this 改变
    console.log(this.name);
    return x+y;
}
var obj={
    name:"li"
}

Function.prototype.Mycall=function(obj,...arg){
    obj=obj||window;
    var res=null;
  // this  fn
  //this();
  obj.$fn=this;
  res= obj.$fn(...arg);
  delete obj.$fn;
  return res;
}


fn.Mycall(obj,1,2);