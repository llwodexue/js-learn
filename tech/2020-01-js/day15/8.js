var n=2;//===>4===>8
var obj={
    n:3,//====>6
    fn:(function(n){
      /*
      私有 n=2===》4===>5==>6=>7
      
      */
      n+=2;
      this.n+=2;//window.n+=2===>4
      var n=5;
      return function (m){
          //私有 m=3
          // m=3
         this.n*=2;//window.n*=2===>8
                   //obj.n*=2==>6
         console.log(m+(++n));//3+6=9;
                              //3+7=10
      }
    })(n)

};
var fn=obj.fn;
fn(3);//
obj.fn(3);
console.log(n,obj.n)