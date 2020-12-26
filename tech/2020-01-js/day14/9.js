/* 
全局：
var i=10
function fn
var f

*/

var i=10;//===>11===>12==>13==14
function fn(){
    /* fff */
   return function(n){
      console.log(n+(++i));
   }
}
var f=fn();// f=fff
f(20);//n=20 20+11=31
fn()(20);//n=20 20+12=32
fn()(30);//n=30 30+13=43
f(30);//n=30 30+14=44