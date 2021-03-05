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
