[toc]

# 52\_笔记

## webpack

*webpack* 是一个现代 JavaScript 应用程序的*静态模块打包器(module bundler)*。当 webpack 处理应用程序时，它会递归地构建一个*依赖关系图(dependency graph)*

- 他如何找到js？如何建立依赖？如何建立模块？webpack是基于node.js开发的，用的是里面的 fs模块 进行的读取操作



### 作用

打包和编译

- 代码转换：ts编译成js；less、 scss编译成css； es6、es7编译成es5；虚拟dom编译成真实dom等
- 文件优化：压缩js、css、html文件；压缩合并图片，图片base64等
- 代码分割：提取多个页面的公共代码，提取首屏不需要执行部分的代码
- 模块合并：在采用模块化的里，会有多个模块和文件需要构建功能把模块分类合并成一个文件
- 自动刷新：监听本地源代码的变化，自动重新构建，刷新浏览器
- 代码校验：ESLint代码规范校验、检查、单元检测等
  (webpack本身不大，但是咱们要是实现某一些功能，还要往webpack中加一个模块来实现)



### 配置

当前使用的webpack版本是4，在vue和react中使用的webpack版本几乎都是4

- 在webpack打包的时候，默认打包入口就是src文件夹下的index.js文件
- 打包完成之后会在根路径生成一个dist文件夹，文件夹里的文件就是编译打包后的文件 main.js

webpack是基于node开发的，所以在配置的时候，用的是node里的导入导出规范

 `package.json` 

```json
"devDependencies": {
    "clean-webpack-plugin": "^3.0.0",
    "html-webpack-plugin": "^4.5.1",
    "webpack": "^4.46.0",
    "webpack-cli": "^3.3.12",
    "webpack-dev-server": "^3.11.2"
},
```

**注意：** `webpack.config.js` 当前webpack自定义配置模块必须放到根路径下

### 入口（entry）

 `webpack.config.js` 

```js
module.exports = {
    entry: "./src/index.js"
}
```

### 出口（output）

 `webpack.config.js` 

```js
const path = require("path");
module.exports = {
    output: {
        path: path.resolve(__dirname, "build"),
        filename: "index.min.js",
        // hash的值每一次打包生成的都不一样
        // filename: "index[hash].min.js",
    },
};
```

### 插件（plugins）

 `webpack.config.js` 

```js
// 生成html模板
const HtmlWebpackPlugin = require("html-webpack-plugin");
// 清除之前的打包的内容
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
module.exports = {
    // webpack编译的时候，会把当前的模板html进去读取，把最新的打包的js文件引入到模板中，然后生成一个新的html文件放到build文件夹中
    plugins: [
        new HtmlWebpackPlugin({
            template: "./public/index.html", // 模板文件
            filename: "index.html", // 当前生成的html文件
            // hash: true, // 这里的hash和output是一样的，为了防止走缓存
            minify: {
                collapseWhitespace: true, //把标签之间的空格去掉
                removeComments: true, // 去掉注释,
                removeAttributeQuotes: true, //把属性双引号去掉
                removeEmptyElements: true, // 去掉行间的空属性
            },
        }),
        new CleanWebpackPlugin(),
    ],
};
```

### 开发中（devServer）

 `webpack.config.js` 

```js
const path = require("path");
module.exports = {
    // 配置一个类似live server的功能，它能自动创建一个web服务，还能配置proxy代理
    devServer: {
        port: 3000, // 监听的端口号
        compress: true, // 开启GZIP
        contentBase: path.join(__dirname, "build"), // 指定的资源访问路径
        open: true, // 自动打开浏览器
        hot: true, // 开启热更新
        proxy: {
            "/": "http://127.0.0.1:8888",
        },
    },
};
```

 `package.json` 

```json
"scripts": {
    "build": "npx webpack",
    "hot": "webpack-dev-server",
    "dev": "webpack --config webpack.config.dev.js"
},
```

### 模式（mode）

```js
module.exports = {
    // 默认是production
	mode: "development", // 打包之后代码是没有压缩的
};
```



## 模块化

js本身是弱化命名空间概念的，只有全局作用域和私有作用域，而模块化开发，从某种弄意义上来说，是强化了命名空间的概念

- 有利于代码分离、解耦以及复用
- 团队并行开发
- 避免命名冲突
- 相互引用，按需加载

模块化的发展史

- 单例设计模式
- AMD（异步模块定义require.js）
- CMD（通用模块定义）
- CommonJS（一般用于服务器开发，例如node.js）
- ES6 Module（js官方标准模块定义方式）

### CommonJS

```js
const A = require("./A"); // 导入的过程是同步的，导入不完，下边的代码不执行

// 批量导出
module.exports = { fn, };
```



### ES6 Module

ES6Module是js新增的模块导入导出规范，它是静态编译的

- 动态编译，代码执行到具体位置的时候才会进行模块的导入和导出
- 静态编译，代码还没有执行，就会按照依赖关系把模块导入导出了和编译好了

**注意：**

1. 模块的导入都要放到代码执行的最前面（ES6的module）
2. 浏览器不能直接识别，需要进行编译才可以(webpack可以进行编译)

**export**

```js
// 写法一：一个一个导出（必须声明）
export var m = 1;

// 写法二：批量导出
var m = 1;
export { m };

// 写法三：可以使用as关键字重命名
var n = 1;
export { n as m };
```

**import**

```js
// 可以使用as关键字重命名
import { a as b } from "./xxx";

// 批量导入
import { c, d } from './xxx';

// 可以全部导入
import * as e from './xxx';
```

### npm使用

**安装到全局的特点：**

1. 所有项目都能用
2. 可以使用命令
3. 版本可能会冲突
4. 安装在全局不能基于CommonJS等模块规范进行导入导出

**安装到本地的特点：**

1. 当前项目可以使用
2. 不可以使用命令
3. 版本不会冲突
4. 可以基于CommonJS等模块规范进行导入导出

**npm 速度优化**

如果当前的可执行脚本安装到当前项目里，是不能够直接执行的，新版npm有一个npx命令，在执行脚本命令之前加上npx就可以

```bash
npm i nrm -g

nrm ls
nrm use taobao
```

- 真实项目中，一般都是安装在本地

跑环境和依赖项

--save-dev 生成依赖（可以省略） -S

--dev 开发依赖 -D