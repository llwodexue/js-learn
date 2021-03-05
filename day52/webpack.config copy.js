// 在这里可以对webpack编译打包的过程进行自定义配置
// webpack是基于node开发的，所以在配置的时候，用的是node里的导入导出规范

const path = require("path");
// 生成html模板
const HtmlWebpackPlugin = require("html-webpack-plugin");
// 清除之前的打包的内容
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
module.exports = {
    entry: "./src/index.js",
    output: {
        path: path.resolve(__dirname, "build"),
        filename: "index[hash].min.js",
    },
    // webpack编译的时候，会把当前的模板html进去读取，然后把最新的打包的js文件引入到模板中，然后生成一个新的html文件放到build文件夹中
    plugins: [
        new HtmlWebpackPlugin({
            template: "./public/index.html",  // 模板文件
            filename: "ss.html", // 当前生成的html文件
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
    // 配置一个类似live server的功能（仅仅为了开发使用），它能自动创建一个web服务，然后打开一个网页，而且还能在你改了开发代码之后把页面自动更新，还能配置proxy代理
    devServer: {
        port: 3000, // 监听的端口号
        compress: true, // 开启GZIP
        contentBase: path.resolve("./build"), // 指定的资源访问路径
        open: true, // 自动打开浏览器
        hot: true, // 开启热更新
    },
};
