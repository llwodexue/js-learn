// 求1到100中同时能被2整除又能被3整除的所有数之和

function fn(num){
    if(num>100){
      return 0;
    }
    // 同时能被2并且3整除
    if(num%2==0&&num%3==0){
       return num+fn(num+1)
    }
    return fn(num+1);

}
fn(1)