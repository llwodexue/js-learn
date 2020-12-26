var ary=[8,2,1,5];
/* 
冒泡排序
需求：排序（升序）
第一轮：
   [2,1,5,8] 经过一轮比较，得到了第一个最大数8
第二轮：
   [1,2,5,8] 经过第二轮比较，得到了第二个最大数：5
第三轮：  
   [1,2,5,8] 经过第三轮比较，得到了第二个最大数：2
第四轮还用比较吗？ 总共有四个数，已经得到了3个最大数了，所以最后一个肯定是最小的   

轮数的规律：ary.length-1;

第一次：[2,1,5,8]; 正常的比较的时候：两两比较 ：ary.length-1-0; (3)
第二次：[2,1,5,8]； ary.length-1-1
第三次：[1,2,5,8]   ary.length-1-2

轮数的规律：ary.length-1;
两两比较规律：ary.length-1-已经比过的轮数
*/

var ary=[8,2,1,5];
function mySort(ary){
    // 轮数
   for(var i=0;i<ary.length-1;i++){
       // 两两比较
       for(var j=0;j<ary.length-1-i;j++){
           // 当前项比下一项大，就换位置
             if(ary[j]>ary[j+1]){
                 //把ary[j]的值先临时存储下
                 var temp=ary[j];
                 ary[j]=ary[j+1];
                 ary[j+1]=temp;
             }
       }
   }
   return ary;
}

var res=mySort(ary);
console.log(res);