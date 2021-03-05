const express = require("express");
const app = express();
const request = require("request");

app.use(express.static("./"));
app.get("/subscriptions/recommended_collections", function (req, res) {
    let url = "https://www.jianshu.com/asimov" + req.url;
    req.pipe(request(url)).pipe(res);
});

app.listen(8888, () => {
    console.log("启动成功");
});
