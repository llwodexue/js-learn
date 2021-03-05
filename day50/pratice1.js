/* let http = require("http");
let url = require("url");
// '/user/list?name=1&gae=18'
// /index.html
url.parse("/user/list?name=1&gae=18", true);

let app = http.createServer((req, res) => {
    // 客户端每请求一次，这里就会响应一次
});

app.listen(8888, () => {
    console.log("8888-->success");
}); */

const express = require("express");
const { readFile } = require("./promiseFs");
const qs = require("qs");
const bodyParser = require("body-parser");

let app = express();

// 当前的静态资源的请求就会自动的往对应的static里去查找
app.use(express.static("./static"));

// app.use此方法就是使用中间件，中间件里边传递的函数会在创建完服务之后，处理请求之前执行，我们可以在这里做一些公共的逻辑处理
// app.use是按照代码的正常顺序执行

// 比如咱们接收post请求体
app.use((req, res, next) => {
    // 我就可以在这里吧post系列的请求体提前接收完成挂载到req上
    let data = "";
    req.on("data", (ss) => {
        data += ss;
    });
    req.on("end", () => {
        console.log(data);
        data = qs.parse(data);
        req.body = data;
        next();
    });
    // next(); // next控制的是请求继续往下执行，如果不写next()的话，那代码走到这就不会往下走了
});

// 'http://127.0.0.1:8888/list'
// name=1&age=2
app.post("/add", (req, res) => {
    console.log(222);
    console.log(req.body, 50);
});

// 错误的请求放到最下边
app.use((req, res, next) => {
    res.status(404);
    // res.type('application/json')
    res.send("not fount");
});
app.listen(8888, () => {
    console.log("8888 -->success");
});

app.use(
    bodyParser.urlencoded({
        extended: true,
    })
); // 他里边的逻辑和咱们上边注释的代码逻辑一模一样
