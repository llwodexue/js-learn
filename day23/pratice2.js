// let p = document.querySelector("p");
// let scrollH = p.scrollHeight;
// console.log(scrollH);

// let winT = document.documentElement.scrollTop || document.body.scrollTop;
// let winL = document.documentElement.scrollLeft || document.body.scrollLeft;
// // let maxS = scrollHeight - clientHeight;
// console.log(winT, winL);

// 封装一个方法撞门用来设置或获取浏览器的某些属性
function win(attr, val) {
    if (val == undefined) {
        return document.documentElement[attr] || document.body[attr];
    }
    document.documentElement[attr] = val;
    document.body[attr] = val;
}
win("scrollTop", 100);
console.log(win("clientWidth"));
