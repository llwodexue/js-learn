[toc]

# 48\_笔记

## Node 三大模块

- 内置模块：node中自带的（可以不写路径）
  + http/https 创建和管理服务的模块
  + fs 给予JS进行I/O操作的
  + url 解析URL地址的
  + path 管理路径的
  + ...
- 第三方模块：基于npm安装，别人写好供我们用的（可以不写路径）
  + mime
  + qs
  + express
  + express-session
  + body-parser
  + ...
- 自定义模块：自己写的模块（必须写路径）

## fs

> fs内置模块给予JS在node环境下能够对本地的文件进行I/O操作的能力

**readdir**

- 读取指定的目录

```js
// 同步写法 Sync同步
let res = fs.readdirSync("./");
console.log(res); // [...]

// 异步写法
fs.readdir("./", (err, res) => {
    // 如果没有错误，err的值是null，res的值是读取到的目录（数组形式）
    console.log(err, res); // null [...]
    // 如果读取是失败的，err的值是失败的信息，res的值是undefined
});
```

**readFile**

- 读取文件

**注意：**

1. 读取文件的时候，默认读取格式是Buffer文件流的格式
2. 如果读取的文件是富媒体资源，那就不需要转格式（就是用Buffer文件流进行传输）

```js
// 同步写法
let res = fs.readFileSync("./1.js", "utf-8");
console.log(res); // ...

// 异步写法
fs.readFile("./1.js", "utf-8", (err, res) => {
    console.log(err, res); // null ...
});
```

**writeFile**

- 写入文件

**注意：**

1. 向文件中写入内容是覆盖写入
2. 如果当前路径文件不存在，会创建一个文件
3. 如果使用同步方式写入，路径不对，会报错

```js
try {
    fs.writeFileSync("./1.txt", "hello world", "utf-8");
} catch {}

fs.writeFile("./1.txt", "hello world", "utf-8", (err, res) => {});
```

**appendFile**

- 追加内容

```js
fs.appendFile("./1.txt", "hi", "utf-8", () => {});
fs.appendFileSync("./1.txt", "hi", "utf-8");
```

**rmdir**

- 删除目录

```js
// 如果当前要删除的文件流有文件，则不能删除
fs.rmdir("./1", (err) => {
    console.log(err); // directory not empty
});
```

**unlink**

- 删除文件

```js
fs.unlink("./1.txt", () => {});
```

**mkdir**

- 创建目录

```js
fs.mkdir("./a", () => {});
```

**对目录进行操作**

- readdir
- mkdir
- rmdir

**对文件进行操作**

1. readFile
2. writeFile/appendFile
3. unlink

**批量创建文件夹和文件**

```js
const fs = require("fs");

let path = "F:/daydayup";
// 批量创建 day1-day10 10个文件夹，文件夹里面包含 1.js 2.js
for (let i = 1; i <= 10; i++) {
    fs.mkdirSync(`${path}/day${i}`);
    fs.writeFileSync(`${path}/day${i}/1.js`);
    fs.writeFileSync(`${path}/day${i}/2.js`);
}
```

**封装读取文件**

**注意：**

1. 读取（剪切板）文件的路径是相对于当前打开的终端路径
2. 不要以当前的文件作为参照目录

```js
const fs = require("fs");

function readFile(pathname) {
    return new Promise((resolve, reject) => {
        fs.readFile(pathname, "utf-8", (err, res) => {
            if (err !== null) {
                reject(err);
                return;
            }
            resolve(res);
        });
    });
}

module.exports = {
    readFile,
};
```

## path

```js
let path = require("path");
console.log(__dirname); // 当前模块的根路径
console.log(path.resolve()); // 当前打开终端的路径
console.log(path.resolve("...")); // 当前终端路径+ 拼接路径
```

## Promise版本 封装fs方法

- promiseFs.js

```js
let path = require("path");
let fs = require("fs");
let obj = {};

// 处理后缀名
function handleSuffix(pathname) {
    let encoding = "utf-8";
    let suffixReg = /\.([a-zA-Z0-9]+)$/;
    let suffix = suffixReg.exec(pathname) && suffixReg.exec(pathname)[1];
    if (/^(png|jpg|jpeg|gif|svg|mp3|mp4)$/i.test(suffix)) {
        encoding = null;
    }
    return encoding;
}

// 处理 "readFile" "readdir" "mkdir" "rmdir" "unlink"
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
// 处理 "writeFile" "appendFile" 
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
// 处理 "copyFile"
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
```

## 合并css

- combinCss.js

1. 先把当前css文件夹里的目录获取到
2. 读取到每一个css文件的内容，把所有的内容拼接到一起
3. 在dist里创建一个新的文件，并且把刚才拼接的内容写到新内容里

```js
let fs = require("./promiseFs");

fs.readdir("./css")
    .then((res) => {
        return res;
    })
    .then((res) => {
        // 读取到每一个css文件中的内容
        let data = res.map((item) => {
            return fs.readFile(`./css/${item}`);
        });
    	// data [ Promise { <pending> }, Promise { <pending> } ]
        return data;
    })
    .then((res) => {
        Promise.all(res).then((res) => {
            // res是数组，里面是每一个css文件的内容（字符串格式）
            let combine = res.join("");
            fs.writeFile("./dist/index.css", combine);
        });
    });
```

