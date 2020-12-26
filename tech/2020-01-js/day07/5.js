/* 
 用递归求1-100之和

*/

function total(num){
  if(num>100){
     return 0;
  }  
  return  num+total(num+1);
}
var res=total(1);
console.log(res);