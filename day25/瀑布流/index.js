let uls = [].slice.call(document.getElementsByTagName("ul"));
function getData() {
    let data = null;
    let xhr = new XMLHttpRequest();
    xhr.open("get", "data.json", false);
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4 && /^2\d{2}$/.test(xhr.status)) {
            data = JSON.parse(xhr.responseText);
            renderHtml(data);
        }
    };
    xhr.send();
}
getData();
function renderHtml(data) {
    for (let i = 0; i < 20; i++) {
        let index = Math.round(Math.random() * 199);
        let curImg = data[index];
        let li = document.createElement("li");
        let p = document.createElement("p");
        let img = document.createElement("img");
        img.setAttribute("true-img", curImg.src);
        img.classList.add("bg");
        p.innerText = curImg.title;
        img.style.height = Math.round(Math.random() * 120 + 240) + "px";
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
function delayImg(imgs) {
    let winH = utils.win("clientHeight");
    let winT = utils.win("scrollTop");
    let imgH = imgs.offsetHeight;
    let imgT = utils.offset(imgs).top;
    if (winH + winT >= imgH + imgT) {
        let trueImg = imgs.getAttribute("true-img");
        let newImg = new Image();
        newImg.src = trueImg;
        newImg.onload = function () {
            imgs.src = trueImg;
            imgs.classList.remove("bg");
            fadeIn(imgs);
        };
    }
}
delay();
function isLoad() {
    let winH = utils.win("clientHeight");
    let winT = utils.win("scrollTop");
    let bodyT = utils.win("scrollHeight");
    if (winH + winT + 100 >= bodyT) {
        getData();
    }
}
back.onclick = function () {
    // 让定时器每运行一次就走 1/50 没运行一次走 20ms
    let distance = utils.win("scrollTop");
    let step = distance / 50;
    let timer = setInterval(() => {
        distance -= step;
        utils.win("scrollTop", distance);
        if (distance <= 0) {
            clearInterval(timer);
            timer = null;
        }
    }, 20);
};
function isButtonShow() {
    let winH = utils.win("clientHeight");
    let winT = utils.win("scrollTop");
    if (winT >= winH) {
        utils.css(back, "display", "block");
    } else {
        utils.css(back, "display", "none");
    }
}
function fadeIn(img) {
    utils.css(img, "opacity", 0.05);
    let distance = utils.css(img, "opacity");
    let timer = setInterval(() => {
        distance += 0.05;
        utils.css(img, "opacity", distance);
        if (distance >= 1) {
            clearInterval(timer);
            timer = null;
        }
    }, 20);
}
window.onscroll = function () {
    delay();
    isLoad();
    isButtonShow();
};
