[toc]

# 53\_笔记

## webpack

### 多页面配置

```js
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

let arr = ["index", "login"].map((item) => {
    return new HtmlWebpackPlugin({
        template: `./public/${item}.html`,
        filename: `${item}.html`,
        chunks: [item], // 指定当前html要引入的js文件
        minify: {
            collapseWhitespace: true,
            removeComments: true,
            removeAttributeQuotes: true,
            removeEmptyAttributes: true,
        },
    });
});

module.exports = {
    entry: {
        index: "./src/index.js",
        login: "./src/login.js",
    },
    output: {
        path: path.resolve(__dirname, "./build"),
        filename: "[name].[hash].min.js", // name代表entry中的属性名，打包之后的文件名就是name
    },
    plugins: [...arr, new CleanWebpackPlugin()],
    devServer: {
        port: 3000,
        compress: true,
        contentBase: path.join(__dirname, "build"),
        open: true,
        hot: true,
    },
};
```

### loader

对一个单独的 module 对象定义了 `rules` 属性，里面包含两个必须属性：`test` 和 `use`

1. `test` 属性，用于标识出应该被对应的 loader 进行转换的某个或某些文件
2. `use` 属性，表示进行转换时，应该使用哪个 loader

```js
// 在webpack中使用loader进行解析
// 这个loader解析是按照从下到上，从右到左的顺序解析的
module: {
    rules: [
        {
            test: /\.(less|css)$/i,
            use: [
                MiniCssExtractPlugin.loader,
                // "style-loader", // 把处理好的css样式内嵌到html页面内
                "css-loader", // 处理css文件里的@import
                "postcss-loader", //处理兼容（给样式增加前缀），需要配合postcss.config.js
                "less-loader", // 把less代码编译成css代码
                /* {
                        loader: "less-loader",
                        options: {}, // 对当前loader进行个性化配置
                    }, */
            ],
        },
    ],
},
```

### optimization

```js
const OptimizeCssAssetsWebpackPlugin = require("optimize-css-assets-webpack-plugin");
const TerserWebpackPlugin = require("terser-webpack-plugin");

// 配置优化项
optimization: {
    // 进行压缩处理
    minimizer: [
        new OptimizeCssAssetsWebpackPlugin(), // 压缩CSS
        new TerserWebpackPlugin(), // 压缩JS
    ],
},
```



### 处理CSS

`package.json`

```json
"browserslist": [
    "> 1%",
    "last 2 version"
]
```

- `>1%` 只要市面上某个浏览器使用大于1%，那就做兼容处理
- `last 2 version` 只对最后 2 个版本做兼容

`webpack.config.js`

```js
const path = require("path");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCssAssetsWebpackPlugin = require("optimize-css-assets-webpack-plugin");

module.exports = {
    plugins: [
        new MiniCssExtractPlugin({
            filename: "index.[hash].min.css",
        }),
        new CleanWebpackPlugin(),
    ],
    module: {
        rules: [
            {
                test: /\.(less|css)$/i,
                use: [
                    MiniCssExtractPlugin.loader,
                    // "style-loader", // 把处理好的css样式内嵌到html页面内
                    "css-loader", // 处理css文件里的@import
                    "postcss-loader", //处理兼容（给样式增加前缀），需要配合postcss.config.js
                    "less-loader", // 把less代码编译成css代码
                    /* {
                        loader: "less-loader",
                        options: {}, // 对当前loader进行个性化配置
                    }, */
                ],
            },
        ],
    },
    // 配置优化项
    optimization: {
        // 进行压缩处理
        minimizer: [
            new OptimizeCssAssetsWebpackPlugin(), // 压缩CSS
        ],
    },
};

```

`postcss.config.js`

```js
module.exports = {
    plugins: [require("autoprefixer")],
};
```



### 整体配置

`webpack.config.js`

```js
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCssAssetsWebpackPlugin = require("optimize-css-assets-webpack-plugin");
const TerserWebpackPlugin = require("terser-webpack-plugin");

module.exports = {
    entry: "./src/index.js",
    output: {
        path: path.resolve(__dirname, "./build"),
        filename: "index.[hash].min.js",
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: "./public/index.html",
            filename: "index.html",
        }),
        new MiniCssExtractPlugin({
            filename: "index.[hash].min.css",
        }),
        new CleanWebpackPlugin(),
    ],
    devServer: {
        port: 3000,
        compress: true,
        contentBase: path.join(__dirname, "build"),
        open: true,
        hot: true,
    },
    // 在webpack中使用loader进行解析
    // 这个loader解析是按照从下到上，从右到左的顺序解析的
    module: {
        rules: [
            {
                test: /\.(less|css)$/i,
                use: [
                    MiniCssExtractPlugin.loader,
                    // "style-loader", // 把处理好的css样式内嵌到html页面内
                    "css-loader", // 处理css文件里的@import
                    "postcss-loader", //处理兼容（给样式增加前缀），需要配合postcss.config.js
                    "less-loader", // 把less代码编译成css代码
                    /* {
                        loader: "less-loader",
                        options: {}, // 对当前loader进行个性化配置
                    }, */
                ],
            },
            {
                test: /\.(jpg|png|jpeg|gif)$/i,
                // use: ["file-loader"],
                use: [
                    {
                        // loader: "file-loader",
                        loader: "url-loader", // 把图片转换成base64编码，但是转换时有大小限制，如果当前的图片小于2kb就会被base64编码，相反，如果大于2kb那就还是file-loader进行解析
                        options: {
                            limit: 70 * 1024, // 左图片转码的大小限制，默认单位是b
                            outputPath: "./images",
                            name: "[name].[hash].[ext]", // 指定生成图片的名字
                            esModule: false, // 在js中可以正常引入路径
                        },
                    },
                ],
                include: path.resolve("./src"), // 哪些路径资源会进行处理
                // exclude: /node_modules/, // 哪些路径下的资源不会进行处理
            },
            {
                // 处理html里的图片链接
                test: /\.html$/i,
                use: ["html-withimg-loader"],
            },
            {
                // 处理字体图标
                test: /\.(svg|eot|ttf|woff2)$/i,
                use: ["file-loader"],
            },
            {
                test: /\.js$/i,
                use: [
                    {
                        loader: "babel-loader",
                        options: {
                            // 把es6转换成es5
                            presets: ["@babel/preset-env"],
                        },
                    },
                    "eslint-loader", // 开启词法检测
                ],
            },
        ],
    },
    // 配置优化项
    optimization: {
        // 进行压缩处理
        minimizer: [
            new OptimizeCssAssetsWebpackPlugin(), // 压缩CSS
            new TerserWebpackPlugin(), // 压缩JS
        ],
    },
};
```



## 安装环境

### package.json 安装

```json
{
    "scripts": {
        "build": "webpack",
        "dev": "webpack-dev-server"
    },
    "devDependencies": {
        "@babel/core": "^7.12.10",
        "@babel/plugin-transform-runtime": "^7.12.10",
        "@babel/preset-env": "^7.12.11",
        "autoprefixer": "^10.2.1",
        "babel-loader": "^8.2.2",
        "clean-webpack-plugin": "^3.0.0",
        "css-loader": "^5.0.1",
        "eslint": "^7.18.0",
        "eslint-loader": "^4.0.2",
        "file-loader": "^6.2.0",
        "html-webpack-plugin": "^4.5.1",
        "html-withimg-loader": "^0.1.16",
        "less": "^4.1.0",
        "less-loader": "^7.2.1",
        "mini-css-extract-plugin": "^1.3.4",
        "optimize-css-assets-webpack-plugin": "^5.0.4",
        "postcss-loader": "^4.1.0",
        "style-loader": "^2.0.0",
        "terser-webpack-plugin": "^4.2.3",
        "url-loader": "^4.1.1",
        "webpack": "^4.46.0",
        "webpack-cli": "^3.3.12",
        "webpack-dev-server": "^3.11.2"
    },
    "dependencies": {
        "@babel/polyfill": "^7.12.1",
        "@babel/runtime": "^7.12.5",
        "jquery": "^3.5.1"
    },
}

```

### 命令安装

**处理less和css实现内嵌式引入页面**

```bash
npm i css-loader style-loader less less-loader autoprefixer postcss-loader -D 
```

**处理css和less并且以外链式的方式引入页面**

```bash
npm i mini-css-extract-plugin -D
```

**把css进行压缩**

```bash
npm i optimize-css-assets-webpack-plugin -D
```

**把js进行压缩**

```bash
npm i terser-webpack-plugin@4 -D
```

**处理图片**

```bash
npm i file-loader url-loader html-withimg-loader -D
```

- 项目中需要用到图片的地方
- css中设置背景图片
- js中动态设置图片的路径在
- html中直接引入图片

**es6转es5**

```bash
npm i babel-loader @babel/core @babel/preset-env -D
```

**编译promise**

```bash
npm i @babel/plugin-transform-runtime -D
npm i @babel/polyfill @babel/runtime
```

**语法检测**

```bash
npm i eslint eslint-loader -D
```


