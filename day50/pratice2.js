const express = require("express"),
    app = express();
app.listen(1001, () => {
    console.log("f服务器启动");
});

const bodyParse = require("body-parser");
app.use(
    bodyParse.urlencoded({
        extended: true,
    })
);

app.get("/jsonpTest", (req, res) => {
    let frame
});
