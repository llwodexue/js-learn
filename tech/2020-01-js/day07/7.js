/* 
1、【时间字符串处理】把下面的字符串变成 "2019年08月18日 12时32分18秒"
*/

var str="2019-8-18 12:32:18";
function zero(num){
//    if(num<10){
//      return "0"+num;
//    }
//    return num;
     return num<10?"0"+num:num;
}


var ary=str.split(" "); //[ '2019-8-18', '12:32:18' ]
// var leftAry=ary[0];//'2019-8-18'
// var rightAry=ary[1];//'12:32:18' 

var leftAry= ary[0].split("-");//["2019","8","18"]
var rightAry=ary[1].split(":");//["12","32","18"]

var res=zero(leftAry[0])+"年"+zero(leftAry[1])+"月"+zero(leftAry[2])+"日"+" "+zero(rightAry[0])+"时"+zero(rightAry[1])+"分"+zero(rightAry[2])+"秒";
console.log(res);