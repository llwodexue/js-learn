const express = require("express");
const qs = require("qs");
const fs = require("./promiseFs");
const app = express(); // 相当于http.createServer()
// 和原生listen一样
app.listen(8888, () => {
    console.log("启动成功");
});
// 当get请求发送过来之后，如果他携带的参数lx是dev的话我就给你返回data.json中的dev属性值，如果lx的值是pro的话，我就给你返回data.json中的pro的属性值
app.get("/list", (req, res) => {
    // http://127.0.0.1:8888/list?lx=pro
    let { lx = "pro" } = req.query;
    fs.readFile("./data.json").then((result) => {
        result = JSON.parse(result); // 把当前读取的数据转换成对象
        let data = result[lx];
        console.log(data);
        res.status(200);
        res.send(data);
    });
});
app.post("/add", (req, res) => {
    let data = ``;
    req.on("data", (result) => {
        data += result;
        console.log(data, 24);
    });
    req.on("end", () => {
        console.log(data, 27);
        console.log(qs.parse(data), 28);
        fs.writeFile("./da.json", qs.parse(data))
            .then((result) => {
                res.status(200);
                res.send({
                    code: 0,
                    codeText: "OK",
                });
            })
            .catch(() => {
                res.status(200);
                res.send({
                    code: 1,
                    codeText: "NO",
                });
            });
    });
});

// 客户端发送的请求都会在static执行之后的函数里进行处理，按照请求的路径去static里去找到对应资源进行返回，如果找不到会返回404和对应的文字
// app.use(express.static("./static"));
// app.use((req, res, next) => {
//     res.status(301);
//     res.redirect("http://www.baidu.com");
//     // res.send("NOT FOUND!");
// });
