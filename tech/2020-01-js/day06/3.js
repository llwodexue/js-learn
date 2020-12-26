
/* 
需求：去重
思路：
  第一次：拿1
           ====》2,3,2,4
  第二次：拿2         
           ====》3,2,4  删除2  ===》3,4
  第三次：拿3         
           ====》4  
  第四次，还用拿吗？不用再拿了
  
  原理：依次拿出数组中的每一项，和他后面的所有剩余项进行比较，
  如果有相同的就删除
*/

function unique(ary){
    for(var i=0;i<ary.length-1;i++){
        for(var j=i+1;j<ary.length;j++){
            if(ary[i]==ary[j]){
                ary.splice(j,1);
                j--;
            }
        }
    }
    return ary;
}
var ary=[1,1,1,3,1,2,3,2,4];
var ary2=[2,2,3,4,2];
var res=unique(ary);
var res2=unique(ary2)
console.log(res2);
