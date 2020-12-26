/* 
 不确定要传递多少个参数，求和
*/

function total(){
    var res=0;
    /* 
     i=0===> 的时候，
     res=0+argments[0]=0+1=1
     i======1 
     res=1(上一次计算出来的结果)+arguments[1](2)===>1+2=3
     i=======2
       res=res+arguments[2](3)===>3+3=6;
    */
    for(var i=0;i<arguments.length;i++){
        res=res+arguments[i];
    }
    return res;
 }

total(1,2,3,"2px","2");


 