// 当前模块是index.html的打包入口，大部分资源在这里都可以进行编译和打包
import "./static/css/index.less"; // 把index.less文件的内容引入到打包的入口内

// 在js中如果想使用图片的资源路径，必须使用require导入的方式
// 如果当前图片的路径是外网，可以直接写
// 如果当前脱是项目里的，必须使用require导入
let img = document.createElement("img");
img.src = require("./static/images/moto.jpg");
document.body.appendChild(img);
const a = () => {
    return 1;
};
new Promise((res, rej) => {
    console.log(2);
});
