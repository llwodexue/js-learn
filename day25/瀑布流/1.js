let uls = document.getElementsByTagName("ul");
uls = Array.from(uls);
getData();
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
function renderHtml(data) {
    for (let i = 0; i < 20; i++) {
        let index = Math.round(Math.random() * 199);
        let imgInx = data[index];
        let li = document.createElement("li");
        let p = document.createElement("p");
        let img = document.createElement("img");
        img.setAttribute("true-img", imgInx.src);
        img.classList.add("bg");
        img.style.height = Math.round(Math.random() * 240 + 120) + "px";
        p.innerText = imgInx.title;
        li.appendChild(img);
        li.appendChild(p);
        uls.sort(function (a, b) {
            return a.scrollHeight - b.scrollHeight;
        });
        uls[0].appendChild(li);
    }
}
let imgs = document.getElementsByClassName("bg");
let winH = utils.win("clientHeight");
function delayImg(imgs) {
    for (let i = 0; i < imgs.length; i++) {
        let img = imgs[i];
        let winT = utils.win("scrollTop");
        let imgT = utils.offset(img).top;
        let imgH = img.scrollHeight;
        if (winH + winT >= imgT + imgH) {
            let testImg = new Image();
            let trueImg = img.getAttribute("true-img");
            testImg.src = trueImg;
            testImg.onload = function () {
                img.src = trueImg;
                img.classList.remove("bg");
                fadeIn(img);
            };
        }
    }
}
delayImg(imgs);
function load() {
    let winT = utils.win("scrollTop");
    let bodyT = utils.win("scrollHeight");
    if (winT + winH + 100 >= bodyT) {
        getData();
    }
}
function buttonShow() {
    let winT = utils.win("scrollTop");
    if (winT >= winH) {
        utils.css(back, "display", "block");
    } else {
        utils.css(back, "display", "none");
    }
}
back.onclick = function () {
    let dist = utils.win("scrollTop");
    let step = dist / 50;
    let timer = setInterval(() => {
        dist -= step;
        utils.win("scrollTop", dist);
        if (dist <= 0) {
            clearInterval(timer);
            timer = null;
        }
    }, 20);
};
function fadeIn(img) {
    utils.css(img, "opacity", 0.05);
    let dist = utils.css(img, "opacity");
    let timer = setInterval(() => {
        dist += 0.05;
        utils.css(img, "opacity", dist);
        if (dist >= 1) {
            clearInterval(timer);
            timer = null;
        }
    }, 20);
}
window.onscroll = function () {
    delayImg(imgs);
    load();
    buttonShow();
};
