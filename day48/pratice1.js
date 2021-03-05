const { log } = require("console");
let fs = require("fs");
/* // readdir读取指定的目录
// 同步的读取指定目录（即可按照相对路径读取，还可以按照绝对路径进行读取）
let res = fs.readdirSync("./");
console.log(res);
fs.readdir("./", (err, res) => {
    // 如果没有错误，err的值就是null
    // res的值就是读取到的目录
    console.log(err, res);
});
 */

/* // 读取文件的时候，默认读取格式是Buffer文件流的格式
// 如果读取的文件是富媒体资源，那就不需要转格式（就是用Buffer文件流进行传输）
let res = fs.readFileSync("./1.js", "utf-8");
console.log(res); // ...

fs.readFile("./1.js", "utf-8", (err, res) => {
    console.log(err, res); // null ...
}); */

/* fs.appendFile("./1.txt", "hi", "utf-8", () => {});
fs.appendFileSync("./1.txt", "hi", "utf-8"); */

/* // 如果当前要删除的文件流有文件，则不能删除
fs.rmdir("./1", (err) => {
    console.log(err); // directory not empty
});

fs.unlink("./1.txt", () => {}); */

/* let path = "F:/2020-12-js/day48/a";
for (let i = 0; i < 10; i++) {
    fs.mkdirSync(`${path}/day${i}`);
    fs.writeFileSync(`${path}/day${i}/practice1.js`);
    fs.writeFileSync(`${path}/day${i}/practice2.js`);
} */
