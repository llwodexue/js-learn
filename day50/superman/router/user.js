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
