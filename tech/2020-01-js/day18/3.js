function fn1(){
    console.log(1);
}
function fn2(){
    console.log(2);
}

Function.prototype.call.call(fn1);//A.call(fn1)

Function.prototype.mycall=function(obj){
  obj.$fn=this; //obj=fn1  this=Function.prototype.call;//call
  obj.$fn();    //fn1.$fn=call;
                // fn1.$fn();//call()
     //===========第二次
     // 参数无： obj=window  this=fn1
     //          window.$fn=fn1;    
     //         window.$fn()//fn1();
}





















function fn1(){
    console.log(1);
}
function fn2(){
    console.log(2);
}

fn1.call.call(fn2);//A.call(fn2)

Function.prototype.mycall=function(obj){
  obj.$fn=this; //obj=fn2  this=fn1.call //call
  obj.$fn();    // fn2.$fn=call;
                // fn2.$fn();// call()
     //===========第二次
     // 参数无： obj=window  this= fn2
     //          window.$fn=fn2;
     //           window.$fn;// fn2();
}










function fn1(){
    console.log(1);
}
function fn2(){
    console.log(2);
}
fn1.call(fn2);
fn1.call.call(fn2);
Function.prototype.call(fn1)
Function.prototype.call.call(fn1)