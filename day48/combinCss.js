let fs = require("./promiseFs");

// 1.先把当前css文件夹里的目录获取到
// 2.读取到每一个css文件的内容，把所有的内容拼接到一起
// 3.在dist里创建一个新的文件，并且把刚才拼接的内容写到新内容里
fs.readdir("./css")
    .then((res) => {
        return res;
    })
    .then((res) => {
        // 读取到每一个css文件中的内容
        let data = res.map((item) => {
            return fs.readFile(`./css/${item}`);
        });
        console.log(data);
        return data;
    })
    .then((res) => {
        Promise.all(res).then((res) => {
            // res是数组，里面是每一个css文件的内容（字符串格式）
            let combine = res.join("");
            fs.writeFile("./dist/index.css", combine);
        });
    });
