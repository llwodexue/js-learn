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
