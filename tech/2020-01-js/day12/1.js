var  a=3;

// 形参也是私有变量
function fn(x){
    // 私有变量
    var m=3;
    console.log(m);
}
console.log(m);
fn(1);



{
    let s=3;
    console.log(s);
}

console.log(s);