let http = require("http");
let url = require("url");
let fs = require("./promiseFs");
let mime = require("mime");

let server = http.createServer((req, res) => {
    // console.log(req.url); // 客户端发送的资源路径和参数
    // write就是响应体的内容，write可以执行多次
    // res.write("1");
    let { pathname, query } = url.parse(req.url, true);
    let suffixReg = /\.([a-zA-Z0-9]+)$/;
    let suffix = suffixReg.exec(pathname) && suffixReg.exec(pathname)[1];
    // 客户端的请求：1.数据请求（数据服务器） 2.静态文件请求（web服务器）
    let encoding = "charset=utf8";
    // 如果当前客户端请求的资源是富媒体资源，那就不需要utf8格式转码
    /^(jpg|jpeg|png|gif|mp3|mp4)$/i.test(suffix) ? (encoding = "") : null;
    // 如果当前的suffix的值为null，说明这次发送的是数据请求
    if (suffix) {
        suffix = mime.getType(suffix);
        fs.readFile(`./static/${pathname}`)
            .then((result) => {
                // 不传第一个参数 Invalid status code: { 'content-type': 'text/html' }
                res.writeHead(200, {
                    // 服务端返回的content-type类型叫mime类型
                    "content-type": `${suffix};${encoding}`,
                });
                // 服务端给客户端返回的数据一般都是字符串或者buffer流
                res.end(result);
            })
            .catch((err) => {
                res.writeHead(404, {
                    "content-type": `application/json`,
                });
                res.end(JSON.stringify(err));
            });
    }
});

// 端口号 0-65535
server.listen(8888, () => {});
// 当前同一个端口的服务同时只能启动一次，如果启动了两次就会报错
// Error: listen EADDRINUSE: address already in use :::8888
