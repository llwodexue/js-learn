[toc]

# 50\_笔记

## server.js

```js
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
```



## utils.js

```js
const md5 = require("md5");
// 方法逻辑是把字符串数据变成对象格式，并且把数据中state=1的数据过滤掉
function handleData(data) {
    data = JSON.parse(data);
    return data.filter((item) => {
        return item.state == 0;
    });
}

function MD5Handle(value) {
    // 删除前四位和后四位，然后进行倒序
    return md5(value).substring(4).split("").reverse().join("").substring(4);
}

// 根据jobId找到当前对应的数据然后进行返回
function getJob(id, req) {
    let res = req.$jobData.find((item) => {
        return item.id == id;
    });
    return res;
}

function success(res, option) {
    res.status(200);
    res.send({
        code: 0,
        codeText: "OK",
        ...option,
    });
}

function getDepartment(id, req) {
    let res = req.$departmentData.find((item) => {
        return item.id == id;
    });
    return res;
}

module.exports = {
    handleData,
    MD5Handle,
    getJob,
    success,
    getDepartment,
};
```

## user.js

```js
const express = require("express");
const { MD5Handle, getJob, success, getDepartment } = require("../utils");

let route = express.Router();

// 校验登录态的接口
route.post("/login", (req, res, next) => {
    // console.log(req.$userData); // {...}
    // 1.先拿到当前的请求体
    let { account, password } = req.body;
    // 后台会对当前的密码进行二次校验
    password = MD5Handle(password);
    console.log(account, password);
    // 2.校验当前的account和password在user.json中有没有对应的信息
    // find，如果当前回调函数的返回值是true，整体遍历结束，把当前的item进行返回
    let result = req.$userData.find((item) => {
        return (
            item.password === password &&
            (item.name === account ||
                item.phone === account ||
                item.email === account)
        );
    });
    if (result) {
        // 登录成功
        // console.log(result);
        // 1.获取当前登陆者的power信息
        // 2.设置一个session信息
        // 3.把登录成功的数据信息给客户端进行响应
        let power = (getJob(result.jobId, req) || {}).power || "";
        req.session.power = power;
        req.session.useId = result.id;
        res.status(200);
        success(res, { power });
    } else {
        // 登录失败
        success(res, { code: 1, codeText: "NO" });
    }
});

// 校验登录态的接口
route.get("/login", (req, res) => {
    // 当请求过来以后，就看看当前session里有没有connect.sid
    // 使用这个接口的时候要注意，在登录成功之后才可以使用校验登录的接口，因为只有在登录之后客户端和服务器桑才会有connect.sid
    // 当关闭服务再重新启动的时候，那上次存储的session信息会被清除
    if (req.session.useId) {
        success(res);
    } else {
        success(res, {
            code: 1,
            codeText: "NO",
        });
    }
});

// 校验退出的接口
route.get("/signout", (req, res) => {
    if (req.session.useId) {
        req.session.useId = null;
        req.session.power = null;
        success(res);
    } else {
        success(res, {
            code: 1,
            codeText: "NO",
        });
    }
});

route.get("/list", (req, res) => {
    let { departmentId = 0, search = "" } = req.query;
    req.$userData = req.$userData.map((item) => {
        return {
            id: item.id,
            name: item.name,
            sex: item.sex,
            email: item.email,
            phone: item.phone,
            departmentId: item.departmentId,
            department: getDepartment(item.departmentId, req).name,
            jobId: item.jobId,
            job: getJob(item.jobId, req).name,
            desc: item.desc,
        };
    });
    if (departmentId != 0) {
        // 按照当前的部门ID去过滤出相应的信息
        req.$userData = req.$userData.filter((item) => {
            return item.departmentId == departmentId;
        });
    }
    if (search != "") {
        req.$userData = req.$userData.filter((item) => {
            return (
                item.name.includes(search) ||
                item.phone.includes(search) ||
                item.email.includes(search)
            );
        });
    }
    if (req.$userData.length <= 0) {
        success(res, {
            code: 1,
            codeText: "NO",
            data: [],
        });
    }

    success(res, {
        data: req.$userData,
    });
});

route.get("/info", (req, res) => {
    // 后台加权限，当前接口需要userhandle
    // if(req.session.power.includes("userhandle")){}
    let { userId = req.session.userId } = req.query;
    let data = req.$userData.find((item) => {
        return item.id == userId;
    });
    if (!data) {
        success(res, {
            code: 1,
            codeText: "NO",
            data: null,
        });
        return;
    }
    data = {
        id: data.id,
        name: data.name,
        sex: data.sex,
        email: data.email,
        phone: data.phone,
        departmentId: data.departmentId,
        department: getDepartment(data.departmentId, req).name,
        jobId: data.jobId,
        job: getJob(data.jobId, req).name,
        desc: data.desc,
    };
    success(res, {
        data: data,
    });
});

module.exports = route;
```

