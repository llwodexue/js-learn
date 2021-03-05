const express = require("express");
const app = express();
// 给Jsonp跨域进行响应
// app.get("/list", (req, res, next) => {
//     let { callback } = req.query; // 获取get请求的参数
//     res.send(`${callback}(123)`);
// });

// 白名单，希望谁可以跨域请求，就把谁放到白名单里
let arr = ["http://127.0.0.1:5500", "http://127.0.0.1:5501"];

// Access-Control-Allow-Origin的选项
app.use((req, res, next) => {
    let origin = req.headers.origin;
    // 检测一下当前发送请求的源是否在白名单中，如果有那就把当前origin设置到Allow-Origin中，如果没有，就给他设置一个空（动态设置源Allow-Origin）
    origin = arr.includes(origin) ? origin : "";
    res.header("Access-Control-Allow-Origin", origin);
    res.header("Access-Control-Allow-Credentials", true);
    res.header(
        "Access-Control-Allow-Headers",
        "Content-Type,Content-Length,Authorization, Accept,X-Requested-With"
    );
    res.header(
        "Access-Control-Allow-Methods",
        "PUT,POST,GET,DELETE,OPTIONS,HEAD"
    );
    req.method === "OPTIONS" ? res.send("server is ok") : next();
});

app.get("/list", (req, res, next) => {
    res.send(`123`);
});

app.listen(8888, () => {
    console.log("启动成功");
});
