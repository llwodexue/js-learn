[toc]

# 47\_笔记

## attr和prop

- jQuery 普通元素的值的获取：html()

  原生方法：innerHTML()

- jQuery 表单元素的值的获取：val()

  原生方法：value()



- jQuery 获取设置属性的方法：prop(key)，prop(key, val)

  原生方法：getAttribute(key)，setAttribute(key, val)

## Node

- 基于v8引擎（webkit内核）解析和渲染js（node不是语言，而是一个解析js的工具或者环境）
- npm（node package manager）
- yarn

```bash
npm i axios
yarn add axios
```

### Node应用

1. node.js作为服务器端语言(一般应用于中小型项目)
2. 基于node. js做为中间层(node有一定的抗压和抗并发能力)
3. 可以基于node写一些mock假接口

### I/O

node的特点：

- 单线程
- 无阻塞 I/O
- 事件驱动

> I：input 输入
>
> O：output 输出
>
> I/O：一般指对文件的读写操作

JS在客户端浏览器中运行，能否对客户端本地的文件进行读写操作？
> 答案：不能
>
> 因为要保证客户端的信息安全 input:type='file' 文件上传这种除外，但是这种也需要用户手动选择后才可以

JS在服务器端运行（基于node运行），能否对服务器端的文件进行操作？
> 答案：可以的
> node赋予了JS进行I/O操作的能力（内置模块：fs）

### window & global

1. 在客户端浏览器中运行JS，JS全局对象是：window（提供了很多内置的属性和方法）
2. 在node中运行JS，全局对象是：global
3. 在REPL（Read-Eval-Print Loop）命令中输出的this是global，但是在xxx.js中输出的this是当前模块本身

### CommonJS模块管理机制

> AMD：require.js
> CMD：sea.js
> CommonJS：node.js
> ES6 Module
> 这些模块化思想，规定了在JS中我们的模块该如何的创建、如何的导入以及如何导出

- 导入的模块，会让导入的模块里的代码从头到尾执行一遍
- 导入的过程是同步的，导入没完成，下边的代码不执行
- 如果同一个模块导入多次，只允许执行一次

```js
let sum = (...arg) => {
    return arg.reduce((acc, item) => {
        return acc + item;
    }, 0);
};

let avg = (...arg) => {
    arg = arg.sort((a, b) => a - b).slice(1, arg.length - 1);
    return a.sum(...arg) / arg.length;
};
```
