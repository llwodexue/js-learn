/* 
in:判断某个对象是否拥有某个属性,无论是公有还是私有，只要有，返回值就是true，无就是false
   语法： 属性名 in 对象
   例子： "age" in f1
hasOwnProperty:主要用来检测某个属性是不是对象私有的，如果是私有的就是true，如果不是，或者没有此属性就是false。
   语法： 对象.hasOwnProperty("属性名")
   例子： f1.hasOwnProperty("age")

*/

function Fn(){
    this.age=18;
    this.name="li";
    
}
// 公有 getX
Fn.prototype.getX=function(){

}

var f1=new Fn();

// console.log(f1.hasOwnProperty("getX"));//false
// console.log(f1.hasOwnProperty("age"));// true



// function hasOwnPublicProperty(obj,attr){
//     // obj 具有这个attr 这个属性（不知道公、私）
//     if(attr in obj){
//        if(!obj.hasOwnProperty(attr)){
//            return true
//        }else{
//            return false
//        }
//     }
//     return false
// }
hasOwnPublicProperty(f1,"getX");


// function hasOwnPublicProperty(obj,attr){
//     // obj 具有这个attr 这个属性（不知道公、私）
//     if(attr in obj){
//        if(!obj.hasOwnProperty(attr)){
//            return true
//        }
//     }
//     return false
// }

function hasOwnPublicProperty(obj,attr){
    // obj 具有这个attr 这个属性（不知道公、私）
   return attr in obj&&!obj.hasOwnProperty(attr)?true:false
}

var res1=hasOwnPublicProperty(f1,"getX");//true 共有   私有、没有 false
var res2=hasOwnPublicProperty(f1,"age");//false
var res3=hasOwnPublicProperty(f1,"a");//false

console.log(res1,res2,res3)