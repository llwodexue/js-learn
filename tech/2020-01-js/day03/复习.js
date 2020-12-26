// var a=12;
// var b=a;
// console.log(b);
// var obj1={"name":"lili","age":12};
// var obj2=obj1;
// obj2.age=18;
// console.log(obj1.age);


// var ary1=[3,4];
// console.dir(ary1);


var num=12;
// if(num>0){
//    if(num<10){
//      num++;
//    }else{
//      num--;
//    }
// }else{
//     if(num==0){
//        num++;
//        num=num/10;
//     }
// }
num>0?(num<10? num++: num--):(num==0?(num++,num=num/10):null);
