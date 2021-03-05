$.ajax({
    url: "data.json",
    success: (res) => {},
});

let p = new Promise((resolve, reject) => {
    $.ajax({
        url: "data.json",
        success: (res) => {},
        error: reject()
    });
});
p.then(() => {
    // 第二个请求
    // then中的回调函数执行是异步的
}, () => {});