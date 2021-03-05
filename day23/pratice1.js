// let winH = document.documentElement.clientHeight || document.body.clientHeight;
// let winW = document.documentElement.clientWidth || document.body.clientWidth;
// console.log(winH);
// console.log(winW);
p = document.querySelector("p");
// let boxL = box.clientLeft;
// console.log(boxL);
// let offsetW = p[0].offsetLeft
// console.log(offsetW);

// 获取当前盒子距离 body 的偏移量
// 由于父级参照物可能不是固定的，我们希望 offset得到的是当前盒子距离 body 的偏移量

function offset(el) {
    let left = el.offsetLeft;
    let top = el.offsetTop;
    let parent = el.offsetParent;
    while (parent !== document.body) {
        left += parent.offsetLeft + parent.clientLeft;
        top += parent.offsetTop + parent.clientTop;
        parent = parent.offsetParent;
    }
    return {
        left,
        top,
    };
}
console.log(offset(p));
