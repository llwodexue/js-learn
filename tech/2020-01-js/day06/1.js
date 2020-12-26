var ary=[8,9,7,5,6,1,11,2222];
var res=ary.forEach(function(item,index){
    console.log(item+"----"+index)
});
console.log(res);

var ary2=[1,2,3,4,5,6];
var res=ary2.map(function(item,index){
     return `<li>真美丽啊${index}</li>`;
});
console.log(ary2);