

var time1=setTimeout(function(){
    console.log("hehe");
},1000);
// 清除定时器的方法
clearTimeout(time1);
time1=null;

var num=0;
var time2=setInterval(function(){
   num++;
   if(num>10){
      // 清除定时器的方法
      clearInterval(time2);
      time2=null;
   }
   console.log(num);
},1000);
