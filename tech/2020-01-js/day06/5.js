var ary3=[1,3,1,2,3,2,4];

function unique(ary){
   var newAry=[];
   for(var i=0;i<ary.length;i++){
       /* 
       newAry.indexOf(ary[i])>-1 说明有
       */
       if(newAry.indexOf(ary[i])==-1){
        newAry.push(ary[i]);
       }
   }
   return newAry;
}

var res=unique(ary3);
console.log(res);