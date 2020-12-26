let obj={
    name:"li",
    fn:(function(n){
         // 这里的this   window
         console.log(this);
         return function(){
            // 这里的this
            console.log(this);
         }
    })(10),
  }
  obj.fn();


  (function(){
      //this
      
  })();