var ary1=[1,2,3];
var ary2=[4,5,6];
//var ary3=ary1.concat(ary2);

var ary3=[...ary1,...ary2];
console.log(ary3);

var obj={name:"li"};
var obj2={age:10,"name":"da"};

var obj3=Object.assign(obj,obj2);

var obj4={...obj,...obj2};
console.log(obj4);

// 剩余运算符：把剩余的项装到一个数组中
function fn(x,y,...arg){
   console.log(arg);
}

fn(1,2,3,4,5);

let [a,...arg]=[1,2,3,4,5,6];
console.log(arg);