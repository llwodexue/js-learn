function total(){
   var res=0;
   for(var i=0;i<arguments.length;i++){
       // 先把每项转为数字
       var item=Number(arguments[i]);
       // 判断当前项，如果是有效数字，我再累加，此处的判断条件还可以写成：
       // if(!isNaN)
       if(isNaN(item)==false){
        res=res+item;
       }
   }
   return res;
}

var res=total(1,2,3,"1","1px");

console.log(res)

![]==[]