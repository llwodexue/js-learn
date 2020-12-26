// continue：  结束本次循环，继续下一轮循环
// break：       强制结束整个循环


for(var i=0;i<10;i++){
    if(i<5){
       i++;//
       continue;
    }
    if(i>7){
       i+=2;
       break;
    }
    i+=1;
}
console.log(i);


for(var i=0;i<3;i++){
  console.log(i);
}


console.log(i);