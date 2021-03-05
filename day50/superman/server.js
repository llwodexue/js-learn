const express = require("express");
const bodyParser = require("body-parser");
const session = require("express-session");
const { readFile } = require("./promiseFs");
const { handleData } = require("./utils");
let app = express();
app.use(express.static("./client"));

// 把当前请求主体信息挂载到req.body中
app.use(
    bodyParser.urlencoded({
        extended: true,
    })
);

app.use(
    session({
        secret: "ZFPX",
        saveUninitialized: false,
        resave: false,
        cookie: {
            maxAge: 1000 * 60 * 60 * 24 * 30,
        },
    })
);

// 在真正的接口处理之前，把json文件夹所有数据获取到并且挂载req上
app.use((req, res, next) => {
    let p1 = readFile("./json/user.json");
    let p2 = readFile("./json/department.json");
    let p3 = readFile("./json/job.json");
    let p4 = readFile("./json/customer.json");
    let p5 = readFile("./json/visit.json");
    // 等到五个读取全部完成后再去挂载到req身上
    Promise.all([p1, p2, p3, p4, p5])
        .then((result) => {
            let [
                $userData,
                $departmentData,
                $jobData,
                $customerData,
                $visitData,
            ] = result;
            // 往req上新增了5个属性，分别是每一个json中的数据表格
            req.$userData = handleData($userData);
            req.$departmentData = handleData($departmentData);
            req.$jobData = handleData($jobData);
            req.$customerData = handleData($customerData);
            req.$visitData = handleData($visitData);
            next(); // 代码继续往下执行
        })
        .catch((err) => {
            res.status(500);
            res.send("server is bad");
        });
});

// 当请求的时候会按照一级路径找到对应的处理模块，然后再模块里按照二级路径进行请求的逻辑处理
// 下边几个require在server初始化时就已经加载完成
app.use("/user", require("./router/user"));
app.use("/department", require("./router/department"));
app.use("/customer", require("./router/customer"));
app.use("/job", require("./router/job"));
app.use("/visit", require("./router/visit"));

app.use((req, res) => {
    res.status(404);
    res.send("Not Found");
});
app.listen(8888, () => {
    console.log("8888==>successfully");
});
