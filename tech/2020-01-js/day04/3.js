// function fn(){
//     // 类数组
//   //console.dir(arguments);
//   //arguments.length;// 传递的参数的个数
//   //arguments[索引];//具体的参数
//   console.log(arguments.callee)
// }

// fn.length  得到的是形参的个数
// fn.name    函数的名字

//fn();// 函数的执行


// fn(1,2,3,4)


function fn(x,y){

   return x+y;
}
var res=fn(1,2);
console.log(res);

