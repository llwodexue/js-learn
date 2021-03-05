let path = require("path");
let fs = require("fs");

function handleSuffix(pathname) {
    let encoding = "utf-8";
    let suffixReg = /\.([a-zA-Z0-9]+)$/;
    let suffix = suffixReg.exec(pathname) && suffixReg.exec(pathname)[1];
    if (/^(png|jpg|jpeg|gif|svg|mp3|mp4)$/i.test(suffix)) {
        encoding = null;
    }
    return encoding;
}

let obj = {};
["readFile", "readdir", "mkdir", "rmdir", "unlink"].forEach((item) => {
    obj[item] = function (pathname) {
        return new Promise((resolve, reject) => {
            pathname = path.resolve(pathname);
            let resSuffix = handleSuffix(pathname);
            function callBack(err, res) {
                if (err !== null) {
                    reject(err);
                    return;
                }
                resolve(res);
            }
            if (item !== "readFile") {
                resSuffix = callBack;
                callBack = null;
            }
            fs[item](pathname, resSuffix, callBack);
        });
    };
});
// obj.readFile("./1.txt");

["writeFile", "appendFile"].forEach((item) => {
    obj[item] = function (pathname, content) {
        return new Promise((resolve, reject) => {
            pathname = path.resolve(pathname);
            let resSuffix = handleSuffix(pathname);
            function callBack(err, res) {
                if (err !== null) {
                    reject(err);
                    return;
                }
                resolve(res);
            }
            content && typeof content == "object"
                ? (content = JSON.stringify(content))
                : (content += "");
            fs[item](pathname, content, resSuffix, callBack);
        });
    };
});
// obj.writeFile("./1.txt", { name: 1, age: 2 });

obj["copyFile"] = function (pathname1, pathname2) {
    return new Promise((resolve, reject) => {
        pathname1 = path.resolve(pathname1);
        pathname2 = path.resolve(pathname2);
        function callBack(err, res) {
            if (err !== null) {
                reject(err);
                return;
            }
            resolve(res);
        }
        fs["copyFile"](pathname1, pathname2, callBack);
    });
};

module.exports = obj;
