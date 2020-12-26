function fun(){
    this.a=0;
    this.b=function(){
        //this f
        // f.a
        alert(this.a);
    }
}
fun.prototype={
    b:function(){
        this.a=20;
        alert(this.a);
    },
    c:function(){
        // this f
        // f.a=30;// 改更原来私有的a 让其等于30
        this.a=30;
        alert(this.a);//30
    }
}
var f=new fun();// f 实例 {a:0,b:function..}

f.b();//0
f.c();//30