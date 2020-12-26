//打印1 到10

function fn(num){
   if(num>10){
      return 
   } 
   console.log(num);
   fn(num+1);
}

fn(1)