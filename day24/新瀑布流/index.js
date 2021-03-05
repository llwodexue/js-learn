let uls = [].slice.call(document.getElementsByTagName("ul"));
let data = null;
let page = 1;
function getData(num) {
    let xhr = new XMLHttpRequest();
    xhr.open("get", "data.txt?page=" + num, false);
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && /^2\d{2}$/.test(xhr.status)) {
            data = JSON.parse(xhr.responseText);
        }
    };
    xhr.send();
    renderHtml(data);
}
getData(page);
// 渲染数据
function renderHtml(data) {
    for (let i = 0; i < 20; i++) {
        // 随机产0-9之间的整数
        let index = Math.round(Math.random() * 9);
        // 从data中随机获取一组图片
        let curImg = data[index];
        let li = document.createElement("li");
        let img = document.createElement("img");
        let p = document.createElement("p");
        // 把图片真实路径放到img元素行间
        img.setAttribute("true-img", curImg.src);
        img.style.height = Math.round(Math.random() * (250 - 180) + 180) + "px";
        img.className = "bg";
        p.innerText = curImg.title;
        li.appendChild(img);
        li.appendChild(p);
        uls.sort((a, b) => {
            return a.scrollHeight - b.scrollHeight;
        });
        uls[0].appendChild(li);
    }
}
let imgs = document.getElementsByClassName("bg");
function delay() {
    for (let i = 0; i < imgs.length; i++) {
        delayImg(imgs[i]);
    }
}
function delayImg(img) {
    let winH = utils.win("clientHeight");
    let winT = utils.win("scrollTop");
    let imgH = img.offsetHeight;
    let imgT = utils.offset(img).top;
    if (winH + winT >= imgH + imgT) {
        let trueSrc = img.getAttribute("true-img");
        let newImg = new Image();
        newImg.src = trueSrc;
        newImg.onload = function () {
            img.src = trueSrc;
            img.className = "";
        };
    }
}
delay();
function isLoad() {
    // 当浏览器滚动条卷曲的高度+浏览器可视区的高度>=body真实高度，说明滚动条到底了
    let winH = utils.win("clientHeight");
    let winT = utils.win("scrollTop");
    let bodyH = utils.win("scrollHeight");
    // 当滚动条即将要跑到底部后，马上请求去拿到下一页的数据
    if (winH + winT + 100 >= bodyH) {
        page += 1;
        getData(page);
    }
}
window.onscroll = function () {
    delay();
    isLoad();
};
