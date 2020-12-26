var n;

function A(){
    var n=3;
   return function fn(){
        console.log(n)
    }
    
}

var res=A();
res();



