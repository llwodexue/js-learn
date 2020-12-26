var ary=[1,2,3,4];

/* 
第一次的时候：ary[0]
第二次的时候：ary[2]
打印所有的奇数项，其实就是打印多有索引为偶数的项
*/

for(var i=0;i<ary.length;i++){
    // 取余
    if(i%2==0){
        console.log(ary[i]);
    }
    
}