[toc]

# 36\_笔记

## CSS预处理器 Less

常见的有 less （基于 node 写的，编译比较快，入门简单）和 sass （基于 Ruby 写的）

- 嵌套 反映层级和约束
- 变量和计算 减少重复代码
- Extend 和 Mixin 代码片段
- 循环 适用于复杂有规律的样式
- import css 文件模块化



可以使用 VSCode `Easy LESS` 插件编译，也可使用 `lessc index.less index.css`

- 需要先在全局安装 less，`npm install -g less`

### less变量

> 以`@`开头定义变量
>
> 当变量为选择器、属性、URL变量时，变量名必须使用大括号包裹

```less
/* less */ 
// 样式变量
@w: 200px;
@img-cover: center center/cover;
// 选择器变量
@name: #header;
// 属性变量
@bg: background;
// 路径变量
@url: "./img";
// 选择器变量需使用大括号包裹
@{name} {
    @w: 300px;
    .box {
        width: @w;
        height: @w;
        // 属性和URL变量需使用大括号包裹
        @{bg}: url("@{url}/1.jpg") @img-cover;
    }
}

/* 生成css */ 
#header .box {
  width: 200px;
  height: 200px;
  background: url("img/1.jpg") center center / cover;
}
```

- less 解析顺序是从后往前解析

```less
/* less */ 
@found: "hello world";
@var: "found";
#wrap::after {
    content: @@var;
}

/* 生成css */ 
#wrap::after {
  content: "hello world";
}
```

### less 混合

**有参调用**

> 无参调用：定义一个属性集为一个class，然后再另一个里面调用这个
>
> 有参调用：在无参调用上加上参数

```less
/* less */ 
.p(@w) {
    width: @w;
    border: 1px solid rgb(131, 131, 131);
    line-height: 300px;
}
#title {
    .p(100px);
}

/* 生成css */ 
#title {
  width: 100px;
  border: 1px solid #838383;
  line-height: 300px;
}
```

**@arguments 变量**

> @arguments 变量，包含所有传递进来的参数

```less
/* less */ 
.p(@w,@s,@c) {
    border: @arguments;
}
#title {
    .p(1px,solid,red);
}

/* 生成css */ 
#title {
  border: 1px solid red;
}
```

**数量不固定的参数**

> 需要接受数量不固定的参数，可以使用`...`，类似ES6扩展运算符

```less
/* less */
.p(...) {
    border: @arguments;
}
#title {
    .p(1px,solid,blue);
}

/* 生成css */ 
#title {
  border: 1px solid blue;
}
```

### less嵌套

> 可以在父选择器中嵌套子选择器，实现子继承父
>
> &符号：串联选择器时使用，代表最近的父级选择器的名
>
> 嵌套中也有类似作用域的功能。在样式中使用变量，寻找变量的过程类似于作用域查找机制，一层一层往外找（**就近原则**）

```less
/* less */
.ct {
    background: #999;
    p {
        color: #fff;
    }
    &:hover {
        background: #333;
    }
}

/* 生成css */
.ct {
  background: #999;
}
.ct p {
  color: #fff;
}
.ct:hover {
  background: #333;
}
```

### less继承

> extend 是 less 的一个伪类

```less
/* less */
.font {
    color: red;
    font-size: 18px;
    line-height: 18px;
}
.p1 {
    &:extend(.font);
}
.p2 {
    &:extend(.font);
}

/* 生成css */ 
.font,
.p1,
.p2 {
  color: red;
  font-size: 18px;
  line-height: 18px;
}
```

### less循环

> when 关键字用以定义一个导引序列，来实现条件判断
>
> 导引中比较运算有：>、>=、=、<=、<
>
> and 关键字实现与条件，not关键字实现或条件

```less
/* less */
.gen-col(@n) when(@n > 0){
	.gen-col(@n - 1);
	.col-@{n}{
		width: 1000px/4*@n;
	}
}
.gen-col(4);

/* 生成css */ 
.col-1 {
  width: 250px;
}
.col-2 {
  width: 500px;
}
.col-3 {
  width: 750px;
}
.col-4 {
  width: 1000px;
}
```

### less import

> 用`@import` 导入外部文件，但不会添加。把导入的文件编译到最终输出中

```js
@import "./import/module1.less";
@import "./import/module2.less";
```



## Node

### 显示面板

`Ctrl+j ` 显示终端面板

![vscode显示终端](https://gitee.com/lilyn/pic/raw/master/js-img/vscode%E6%98%BE%E7%A4%BA%E7%BB%88%E7%AB%AF.jpg)

### 初始化Node

```bash
# 安装指定版本模块，npm i安装的模块无法用npm uninstall卸载
npm install jquery@1.11.3
# 卸载模块
npm uninstall jquery
# 初始化项目（生成配置化清单package.json） -y/--yes跳过问卷
npm init -y
# 安装package.json中所有依赖的模块
npm install
```

一个新项目流程：

- 创建一个文件
- 把当前文件夹变成仓库（git init）
- 初始化当前项目（npm init -y）
- 下载所需依赖（npm install ...）
- 正常开发
- 把本地项目上传到远程仓库（上传的时候是不包括node_modules的）

项目开发成员：

- git clone当前项目
- 跑环境（npm install）
- 正常开发

### http-server

**安装**

```bash
npm install http-server -g
```

**启动**

```bash
http-server . -c-1
# 简写
hs . -c-1
```



## 参考

[CSS 预处理语言之 less 篇](https://segmentfault.com/a/1190000018011226)

[Git中使用.gitignore忽略文件的推送](https://blog.csdn.net/lk142500/article/details/82869018)