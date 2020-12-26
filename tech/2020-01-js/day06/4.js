var ary=[1,3,1,2,3,2,4];

/* 
var obj={1:1,3:3,2:2,1:1,4:4}
原理：先创建一个空对象，去遍历数组中的每一项，把数组的每项当成属性名和属性值，给此对象添加
在添加的过程中，如果此对象已经有此项，说明重复，在数组中删除掉此项
*/
function unique(ary){
    //先创建一个空对象
   var obj={}; 
   for(var i=0;i<ary.length;i++){
      var item=ary[i];
      // 说明此项已经有了
      
      if(obj[item]==item){
          ary.splice(i,1);
          i--;
          continue;
      }
      obj[item]=item;
   }
   return ary;
}
var res=unique(ary);
console.log(res);