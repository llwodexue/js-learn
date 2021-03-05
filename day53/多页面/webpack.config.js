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
