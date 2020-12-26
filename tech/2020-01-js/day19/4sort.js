var ary=[10,100,50];

ary.sort(function(a,b){
   return a-b;
})


ary.sort(function(a,b){
    return b-a;
})


var ary2=[{age:10},{age:30},{age:5}];

ary2.sort(function(a,b){
    // a、b 代表就是数组中的每一项
     return a.age-b.age;

});
console.log(ary2);