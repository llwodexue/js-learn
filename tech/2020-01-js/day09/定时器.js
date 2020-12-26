/* 
 过多长时间之后，做一些事情（一次）
*/
var time1=setTimeout(function(){
    console.log("hehe");
},2000);

/* 
每隔多长时间就做一次

*/
var time2=setInterval(function(){
    console.log("1")
},1000);


var time3=setTimeout(function(){
    console.log("hehe2");
},2000);
console.log(time1,time2);

/* 
 定时器它的返回值代表的就是，此定时器在当前页面中出现的第几个


*/