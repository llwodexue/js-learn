const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCssAssetsWebpackPlugin = require("optimize-css-assets-webpack-plugin");
const TerserWebpackPlugin = require("terser-webpack-plugin");

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
            new TerserWebpackPlugin(), // 压缩JS
        ],
    },
};
