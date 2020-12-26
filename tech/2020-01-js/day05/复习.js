![]==[];

/* 
 布尔==对象 都转为number 数据类型再比较
 ![];// 转为布尔并取反，除了null 0、 “”、undefined、NaN===》fasle

 false==[]
 Number(false);//0
 Number([]);//0
 true

*/

for(var i=0;i<10;i++){
    console.log(1);
   
}

var obj={name:"li",age:10};
for(var key in obj){
    console.log(key);
    console.log(obj[key])
}
var n=3
while(n>2){

}
do{
  console.log(1)
}while(n>2);


function fn(x,y){
   console.log(x);

}
var res=fn(1,2,3);
console.log(x);


var fn=function(){

}

// ele.onclick=function(){

// }

(function(){

})();
+function(){
    
}();


var fn=function(x,y){
   console.log(arguments); 
   return x+1;
}


var fn=(...arg)=>{
    console.log(arg); 
    
 }
 

fn(1,2);
