let url = require("url");
// url.parse() 传递的第二个参数是true，它可以把query里的参数转换成对象
let res = url.parse(
    "http://www.baidu.com:8080/user/list/?name=1&age=2#index",
    true
);
console.log(res);
/*
Url {
    protocol: 'http:', // 协议
    slashes: true, // 协议后边的斜杠
    auth: null,
    host: 'www.baidu.com:8080', // 域名+端口号
    port: '8080', // 端口号
    hostname: 'www.baidu.com', // 域名
    hash: '#index', // 哈希值
    search: ?name=1&age=2, // 问号传参部分
    query: [Object: null prototype] { name: '1', age: '2' }, // 传参部分
    pathname: '/user/list/', // 资源路径
    path: '/user/list/?name=1&age=2', // 资源路径+参数
    href: 'http://www.baidu.com:8080/user/list/?name=1&age=2#index'
}
*/
