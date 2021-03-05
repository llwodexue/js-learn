// fetch原生
// ajax原生
// axios promise和ajax封装版

fetch("./a.json", {
    // method: "get", // 请求方式
    // body: JSON.stringify(data), //请求主体
    // credentials: "include", //设置当前资源凭证是否携带
    // // include: 不管是同域还是跨域，都允许携带资源凭证
    // // same-origin: 只有同域才允许携带资源凭证
    // // omit: 不允许携带资源凭证
    // headers: { "user-agent": "Mozilla" }, // 请求头
})
    .then((res) => {
        console.log(res);
        // res中有一个ok属性，它代表当前请求的状态，如果成功就是true
        return res.json();
    })
    .then((res) => {
        console.log(res);
    });
