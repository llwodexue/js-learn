/* 
 求数组中的最大一项
*/
//---1)
var ary=[20,100,30,50];
ary.sort(function(a,b){
    return b-a;
})[0];

//---2
var ary=[20,100,30,50];
ary.sort(function(a,b){
    return a-b;
})[ary.length-1];

ary.sort(function(a,b){
    return a-b;
}).pop();

//------3 
Math.max(...ary);

//----4

var ary=[20,100,30,50];

var res=Math.max.apply(null,ary);
console.log(res);

//---5
var ary=[20,100,30,50];
var ary=[20,30,50,100];//经过第一轮比较就可以拿到一个最大值

for(var i=0;i<ary.length-1;i++){
    if(ary[i]>ary[i+1]){
       var temp=ary[i];
       ary[i]=ary[i+1];
       ary[i+1]=temp;
    }
}