// function fn(callback){
//     console.log("下午好");
//     callback();
// }

// fn(function(){
//   alert(2)
// })


function fn(){
    this.x=100;
    this.name="li";
}

var f1=new fn();
var f2=new fn();