const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
module.exports = {
    // mode: "development", // development production
    entry: "./src/index.js",
    output: {
        path: path.resolve(__dirname, "build"),
        filename: "index.min.js",
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: "./public/index.html",
            filename: "index.html",
            minify: {
                collapseWhitespace: true,
                removeComments: true,
                removeAttributeQuotes: true,
                removeEmptyElements: true,
            },
        }),
        new CleanWebpackPlugin(),
    ],
    devServer: {
        port: 3000,
        compress: true,
        contentBase: path.join(__dirname, "build"),
        open: true,
        hot: true,
        proxy: {
            "/": "http://127.0.0.1:8888",
        },
    },
};
