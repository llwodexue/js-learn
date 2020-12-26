/* 
 变量提升： 
  var num （在此阶段第八行已经声明一个变量 num 到第九行的时候又看到了一个，重名了，不再进行重复声明）
  num=3;
*/


var num=2;
var num=3;
console.log(num);


/* 
变量提升阶段：
function fn=AAAFFF111
           =AAAFFF222
           =AAAFFF333

*/

console.log(fn());
function fn(){
   console.log(1);
}
function fn(){
   console.log(2);
}
function fn(){
   console.log(3);
}







/* 
变量提升：
function fn =AAAFFF111

*/


console.log(fn) 
function fn(){   
    console.log(1)
}
var fn=2;  // fn=2     
console.log(fn) //2




正式课第一周
## git 复习
## 打开dos命令窗口的几种方法：
1) window+ r 或者在搜索里面 输入cmd
2) 鼠标右键 git bash here
3）在资源管理器的当前路径直接输入cmd
切换磁盘命令：
+ D: /F:/C: 切换到相应的盘符
## git 的四个区
前三个区都在自己电脑上
+ 工作区
+ 暂存区
+ 历史区
+ 远程仓库
## git 常用的命令
上传的两种方式：
1）
+ 初始化git仓库：git init 
+ git remote -v  
+ git remote add origin https://github.com/wangxiaojingit/text1.git
+ git add .
+ git commit -m"zhushi"
+ git pull origin master
+ git push origin master
2）在github上直接创建仓库
+ 在本地上执行git clone https://github.com/wangxiaojingit/text1.git
+ ....
1）作用域：
1）全局作用域：当打开页面的时候，会提供一个供js代码执行的环境，全局作用域，会默认提供一个最大的window对象。
• 【全局变量】：在全局作用域中声明的变量就是全局变量，其中下面的a 和fn 就是全局变量
• 【全局变量和window关系】 在全局作用域中声明的变量：var、function（除去es6的），相当于给window上添加了属性，属性名就是变量名，属性值就是变量值
•  调用window 下的方法时，可以省去window不写：
window.alert("1");
alert("1");
window.Number("1");
Number("1");
var a=3; // a是全局变量
function fn(){ // fn 是全局变量
      var num=3;
      function f1(){
      }
}
console.log(window.a);
console.log(window.fn);
2）私有作用域：当函数执行的时候，会形成一个私有作用域，保护里面的私有变量不受外界的干扰
【私有变量】：
• 形参
• 在私有作用域中声明的变量就是私有变量。
在私有作用域外面，去访问私有变量的话，是访问不到的，但是在私有作用域里面可以访问到外面的变量。
var f1=66;
function fn(){
    var x=1;
    var y=3;
    console.log(f1);
    return x+y;
}
console.log(x);// x is not defined
fn();
2）作用域链：
在私有作用域中，在查找变量的时候，先看自己私有作用域中有没有，如果有，就用自己的，如果没有，就会向上一级作用域进行查找，如果也没有，一直向上查找，直到找到window全局作用域为止，如果全局也没有，分两种情况：
1） 如果只是查找，就会报错
2） 如果是赋值，就相当于给window全局作用域添加属性和属性值
function fn(){
  console.log(n);// 自己私有作用域没有这个变量，向上级进行查找，上级window 也没有，就报错
}
fn();
function fn(){
   n=3; // 自己私有作用域中没有，向上级进行查找，上级作用域也没有，就相当于给window.n=3;
}
fn();
console.log(n);
function fn(){
   n=3; // 自己私有作用域中没有，向上级进行查找，上级作用域中有，就是上级作用域的n的值重新改了3
}
var n=2;
fn();
console.log(n);
function fn(){
  console.log(n);// 2
}
var n=2;
fn();
console.log(n);
3）堆栈内存
全局作用域形成之后，会有两个虚拟的内存：堆内存和栈内存。
【栈内存作用】：
• 供js执行的环境，存贮基本数据类型的值
• 存贮引用数据类型的值：
• 对象存的是键值对
• 函数存的是代码字符串
4）、变量提升
当浏览器开辟出供js执行的栈内存之后，代码并不是立即自上而下执行，而是需要先做一些事情：把当前作用域中带var 和function 的关键字进行提前的声明和定义，这叫做变量提升机制
    var 和function 在变量提升阶段区别：
• var 在变量提升阶段，是只声明，未定义（不赋值）
• function 在此阶段是声明和定义都完成。
var a=2;
var b=a;
b=3;
console.log(b)
console.log(fn(1,2));   // 依然是3
function fn(n,m){
    return n+m;
 }
console.log(fn(1,2));
5）变量提升的特殊性
1)不论判断条件是否成立，都会进行变量提升
在当前作用域下，不管判断条件是否成功，都会进行变量提升：
var ：还是只声明
function：
• 新版本浏览器中的function 只是声明，不定义
• 在老版本中还是声明和定义（仅限判断语句）
【思考】
console.log(a); 
if(1==2){
  var a=12;
}
console.log(a);
【答案】
console.log(a);//undefined:不管条件是否成立，都会进行变量提升，var a;
if(1==2){
  var a=12;// 条件不成立，所以进不来
}
console.log(a);//undefined
【思考】
console.log(fn);// 在新版本浏览器中，判断条件中的function相当于只是声明（跟var一样），所以undefined
if(1==2){
   function fn(){
       console.log(1)
   }
}
console.log(fn); // undefined   条件不成立，只声明了，没赋值，（新版本浏览器）
【练习题】
console.log(a);
if(a in window){
    var a=100;
}
console.log(a);
【360面试题】
f=function(){
    return true;
};
g=function(){
    return false;
};
~function(){
 if(g()&&[]==![]){
     f=function(){return false;};
     function g(){
         return true;
     }
 }
}();
console.log(f());
console.log(g());
【答案：】
自执行函数在全局作用域下不进行变量提升
题目分析：
1、在全局作用域中，变量提升：无
2、代码开始自上往下执行 f 就是window.f=function(){},  g就是window.g=function(){}
     自执行函数，形成私用作用域，变量提升：不管条件是否成立，判断语句里面的代码都会进行变量提升，function g 在新版本浏览器中只声明未定义。 接着走到if语句中，g（），此时的g只声明未定义，相当于undefined（），所以g（ ）会报类型错误，下面的代码都不会执行Uncaught TypeError: g is not a function
答案：Uncaught TypeError: g is not a function
f=function(){
    return true;
};
g=function(){
    return false;
};
~function(){
 if(g()&&[]==![]){
     f=function(){return false;};
     function g(){
         return true;
     }
 }
}();
console.log(f());
console.log(g());
条件判断下的变量提升到底有多坑
1）在条件判断语句中，如果条件成立，会把执行体当成私有作用域，再进行变量提升 
console.log(fn);
if(1==1){
   console.log(fn);
   function fn(){
       console.log("ok");
   }
}
console.log(fn)
【答案】
console.log(fn);// undefined 在新版本浏览器中，不管条件是否成功，都会进行变量提升，function 只声明，
if(1==1){
    console.log(fn);// fn 函数：在条件判断语句中，如果条件成立，会把执行体当成私有作用域，再进行变量提升   
                    // 再从上往下执行代码，此时fn 定义完成。
   function fn(){
       console.log("ok");
   }
}
console.log(fn) // 条件成立，给fn进行了赋值，打印出fn函数
2)在条件判断下，如果有function定义的变量，在这个function这个函数后面的更改变量的值，更改的都是私有变量。
    var a=0;
    if(true){
       a=1;
       function a(){}
       a=21;
       console.log(a);
    }
    console.log(a);
【答案】21 1
 var 还是原来理解的变量提升，但是function有改变（在条件语句下）
• 在新版本浏览器中，function 只声明，不定义
• 在老版本浏览器中，function 声明和定义
   console.log(num);// undefined
   console.log(fn);// undefined
        if([]){
            // 只要进到当前if条件中，会立即对fn进行赋值；
            fn()
            var num=100;
            function fn(){console.log("a")}
        }
console.log(fn);// undefined
2）只对等号左边的做变量提升
console.log(fn);
console.log(fn(1,2));
var fn=function (n,m){
    return n+m;
 }
console.log(fn(3,4));
【思考】
sum();
fn();
var fn=function(){
    console.log(1);
};
function sum(){
    console.log(2);
}
fn();
sum();
console.log(obj.f1);
var obj={
    f1:function(){
       console.log(1)
    }
}
【分析】：
1、变量提升：var fn （只对等号左边的进行变量提升），function sum
2、自上而下执行代码：
sum() ;//2
fn()；// 此时fn undefined  undefined() 报类型错误
3) return 下面的代码虽然不能执行，但是可以进行变量提升，return 后面的代码不进行变量提升
function fn(){
   console.log(a);
   return function f1(){
   }
   var a=3;
}
fn();
function fn(){
  console.log(f2);
  return function f1(){
  }
  function f2(){
    console.log("f2")
  }
}
fn();
4)如果变量名字重复该如何？
对于var的不会进行重复声明，但是会重新赋值
在变量提升阶段，看到第一行var num ，会声明一个变量num，此时看到第二行还有一个就不用再声明了
var num=2;
var num=3;
console.log(num);
对于function的在变量提升阶段是声明和定义一起完成的，如果遇到重复声明定义的，会进行重新赋值
下面的结果
console.log(fn)
function fn(){
   console.log(1);
}
function fn(){
   console.log(2);
}
function fn(){
   console.log(3);
}


console.log(fn)  
function fn(){    
    console.log(1)
}
var fn=2;      
console.log(fn) 










console.log(num);
var num = 1;
console.log(num);//1
var num = 2;
console.log(num);//2


/* 
变量提升：
function fn =AAAFFF111
            =AAAFFF222    
            =AAAFFF333
            =AAAFFF444


 代码自上而下执行           
*/
fn(); //4
function fn(){
    console.log(1);
}
function fn(){
    console.log(2);   
}
fn();//4
function fn(){
    console.log(3);
}
fn=100; // 重新赋值 fn=100

/* 跳过 */
function fn(){
    console.log(4);   
}
fn();// 100(); 报错