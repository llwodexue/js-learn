//---------1)toArray

function toArray(likeArray){
    var newAry=[];
    for(var i=0;i<likeArray.length;i++){
        newAry.push(likeArray[i])
    }
    return newAry;
}



Array.prototype.slice=function(){
    //this 
    var newAry=[];
    for(var i=0;i<this.length;i++){
        newAry.push(this[i])
    }
    return newAry;
  }
  

//---------------2)
function fn(){
 // var res=  toArray(arguments);
 //var res=Array.prototype.slice.call(arguments)
 var res=[].slice.call(arguments);
  console.log(res);
}

fn(1,2,3);





Array.prototype.slice=function(){
  //this 
  var newAry=[];
  for(var i=0;i<this.length;i++){
      newAry.push(this[i])
  }
  return newAry;
}

var ary=[1,2,3,4,5];
var res=ary.slice();


//----------Array.from 把类数组转为数组

function fn(){
  var res=  Array.from(arguments);
  console.log(res);
   
}
   
fn(1,2,3);

//------3)
function fn(){
    var res=[...arguments]
    console.log(res);
     
  }
     
fn(1,2,3);
     
   