/* 
快速排序
*/
var ary=[12,15,14,13,16,11];

function quickSort(ary){
   if(ary.length<=1){
     return ary;
   }
  // 中间项的索引
  var centerIndex=Math.floor(ary.length/2);
  // 中间项
  var centerValue=ary.splice(centerIndex,1)[0];
  var leftAry=[], rightAry=[];
  for(var i=0;i<ary.length;i++){
      if(ary[i]<centerValue){
         leftAry.push(ary[i]);
      }else{
         rightAry.push(ary[i]);
      }
  }
  return quickSort(leftAry).concat(centerValue, quickSort(rightAry));

}

quickSort(ary);