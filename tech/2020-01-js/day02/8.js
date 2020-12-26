var num=5
// if(num>=5){
//    num++;
    //  alert(num);
// }else{
//    num--;
// }
/* 
 三元运算符：
 条件？成立的执行语句:不成立执行语句
 注意：如果执行体里面有多条语句，用小括号包起来，并且语句和语句之间用逗号隔开
*/

num>=5?num++:num--;
// 多条语句
num>=5?(num++,console.log(num)):num--;
if(num>5){
   num+=2;
}
// 如果你只有一个if判断即可，我们改写成三元的时候，我们需要用一下占位符：

num>5?num+=2:void 0;
num>5?num+=2:null;
num>5?num+=2:undefined;