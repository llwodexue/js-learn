// let imgs = document.querySelectorAll(".bg");
let imgs = document.getElementsByClassName("bg");
// let imgs = document.getElementsByTagName("img");
// 判断每一张图片是否要加载
function delay() {
    // 当函数执行的时候，循环每一张图片，然后判断每一张图片是否需要加载
    for (var i = 0; i < imgs.length; i++) {
        delayImg(imgs[i]);
    }
}
function delayImg(img) {
    // if (img.flag) {
    //     return;
    // }
    let imgH = img.offsetHeight;
    let winH = utils.win("clientHeight");
    let imgT = utils.offset(img).top;
    let winT = utils.win("scrollTop");
    if (winT + winH > imgH + imgT) {
        let trueSrc = img.getAttribute("true-img");
        let newImg = new Image();
        newImg.src = trueSrc;
        newImg.onload = function () {
            img.src = trueSrc;
            img.className = "";
            // img.flag = true;
        };
    }
}
// 刚进界面把已经符合的图片显示出来
delay();
window.onscroll = delay;
