## git 复习
## 打开dos命令窗口的几种方法：
1) window+ r 或者在搜索里面 输入cmd
2) 鼠标右键 git bash here
3）在资源管理器的当前路径直接输入cmd
切换磁盘命令：
+ D: /F:/C: 切换到相应的盘符

## git 的四个区
+ 工作区
+ 暂存区
+ 历史区
+ 远程仓库
前三个区都是在自己的电脑上，多人协作开发，需要远程仓库
## 建立一个仓库的方式

### 第一种
1、git init 让你的文件变成git仓库
2、在github上创建一个远程仓库：https://github.com/wangxiaojingit/2020-02-js.git
3、git add . // 把工作区的东西提交到暂存区（没提交是红色的，提交之后是绿色）
4、git commit -m"注释的内容" // 把暂存区的内容提交历史区
5、本地仓库和远程仓库建立连接：
   git remote add origin https://github.com/wangxiaojingit/2020-02-js.git
   git remote -v //查看
6、git pull origin master // 拉取远程的内容（更新）
7、git push origin master  // 推送

### 第二种
1、在github上创建一个远程仓库：https://github.com/wangxiaojingit/2020-02-js.git
2、在本地磁盘上 打开dos窗口，git clone https://github.com/wangxiaojingit/2020-02-js.git（克隆远程仓库）
3、 git add .
4、git commit -m"注释"
5、 git pull
6、git push



8、（额外命令）
查看状态：git status
查看历史版本：git log
查看所有历史版本：git reflog
回滚： git reset --hard 历史版本号


## 作用域
+ 全局作用域
+ 私有作用域
+ es6 块级作用域

### 全局作用域：
当打开页面的时候，会提供一个供js代码执行的环境全局作用域，会默认提供一个最大的window对象
#### 【全局变量】:在全局作用域中声明的变量
#### 【全局变量和window的关系】 
 判断一个对象有没有某个属性 ：
 语法：属性名 in 对象
 ```
  var obj={name:"lili"}
  "name" in obj // 返回值是布尔数据类型
 ```
 返回值是布尔数据类型，如果是true 代表包含，如果是false 就是不包含
 > 全局变量和window 之间的关系(es5)：在全局作用域下声明的变量，相当于给window添加了一个属性，属性名就是变量名字，属性值就是变量值
 > 在window 身上的方法，咱们可以直接去除window，比如：window.alert("1");写成alert(1)
 #### 在全局变量中带var 和不带的var
  相同点：带var 和不带var 在全局作用域都是给window添加了一个属性和属性值
  不同点：1、带var 有变量提升，不带var的每变量提升
         2、 带var 的通过 delete window.属性名 删除不掉,不带var 的可以删除点
         ```
          var  a=3;
          b=6;
          delete window.a;// false 删除不掉
          delete window.b;// true  能删除掉

         ```

### 私有作用域：
函数执行的时候形成的作用域就是私有的，保护里面的变量不受外界干扰。
【私有变量】：
+ 在私有作用域声明的变量
+ 形参

### 作用域链：
查找变量的时候，先看自己私有作用域中有没有，如果有就是自己私有的，如果没有，就向上一级作用域继续查找，如果上一级也没有，一直向上找，直到找到window为止，如果说window也没有：
1）获取 来说：报错：这个变量 is not undefined
```
function fn(b){
   var x=3;
   console.log(n); // 自己私有作用域无，上级window 也无，报错：n is not defined
}

fn(1);
```
2）赋值 来说：相当于给全局window 添加了这样一个属性名和属性值

```
function fn(b){
   var x=3;
   n=3; // 
}

fn(1);
console.log(n)
```

## 堆栈内存
栈内存：
1、供js运行环境
2、存储基本数据类型的值
堆内存：存储引用数据类型的值
1、对象，存的是键值对
2、函数，存的是字符串

## 变量提升：
代码执行的时候首先会形成一个供js执行的环境，接下来在代码自上而下执行之前有一步操作：“变量提升”
会把带var 和带function的变量都给找出来：
+ var ：只声明
+ function ：声明和定义（赋值）一起完成
